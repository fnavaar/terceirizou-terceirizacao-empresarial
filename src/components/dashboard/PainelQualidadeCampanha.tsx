/* CRM Oficial — Painel de qualidade por campanha (SPEC-4-002 · CA-4-201 · task b7c2faea)
 * Consulta read-only sobre a collection `leads`: compara quantidade e qualidade por campanha.
 * Regras da SPEC: vazio ≠ zero (RN-4-204); fonte e período declarados; nenhum contato; nenhuma alteração de regra.
 * Gate B4-203 embutido: enquanto o champion não aprovar a métrica de qualidade, a coluna "Qualificados"
 * exibe pendência explícita em vez de número — a comparação de quantidade funciona normalmente. */
import React, { useEffect, useMemo, useState } from 'react'
import { BarChart3, CircleAlert, RefreshCw } from 'lucide-react'
import pb from '@/lib/pocketbase/client'

type LeadRow = {
  id: string
  campanha: string
  origem: string
  estagio: string
  estado_qualificacao: string
  estado_agendamento: string
  meta_status: string
  meta_campanha_nome: string
  created: string
}

type CampanhaLinha = {
  chave: string
  origem: string
  recebidos: number
  agendados: number
  convertidos: number
  qualificados: number | null // null = sem métrica aprovada (B4-203) ou sem dado → nunca zero
  temQualificacao: boolean
  temMeta: boolean
}

const SEM_DADO = '—'

function classificar(l: LeadRow): CampanhaLinha | null {
  const chave = (l.meta_campanha_nome || '').trim() || (l.campanha || '').trim()
  if (!chave) return null
  return {
    chave,
    origem: (l.origem || SEM_DADO).trim() || SEM_DADO,
    recebidos: 1,
    agendados: l.estado_agendamento === 'agendado' ? 1 : 0,
    convertidos: l.estagio === 'convertido' ? 1 : 0,
    qualificados: l.estado_qualificacao === 'qualificado' ? 1 : 0,
    temQualificacao: Boolean(l.estado_qualificacao),
    temMeta: l.meta_status === 'espelhado',
  }
}

export const PainelQualidadeCampanha: React.FC = () => {
  const [leads, setLeads] = useState<LeadRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [periodo, setPeriodo] = useState<'30' | '90' | 'tudo'>('tudo')

  const loadLeadsReal = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await pb.collection('leads').getFullList({ sort: '-created' })
      setLeads(response.items as unknown as LeadRow[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar os leads.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { void loadLeadsReal() }, [])

  const linhas: CampanhaLinha[] = useMemo(() => {
    const limite = periodo === 'tudo' ? 0 : Date.now() - Number(periodo) * 24 * 60 * 60 * 1000
    const mapa = new Map<string, CampanhaLinha>()
    for (const raw of leads) {
      if (limite && new Date(raw.created).getTime() < limite) continue
      const l = classificar(raw)
      if (!l) continue
      const atual = mapa.get(l.chave)
      if (!atual) { mapa.set(l.chave, l); continue }
      atual.recebidos += l.recebidos
      atual.agendados += l.agendados
      atual.convertidos += l.convertidos
      atual.qualificados = (atual.qualificados ?? 0) + (l.qualificados ?? 0)
      atual.temQualificacao = atual.temQualificacao || l.temQualificacao
      atual.temMeta = atual.temMeta || l.temMeta
    }
    return Array.from(mapa.values()).sort((a, b) => b.recebidos - a.recebidos)
  }, [leads, periodo])

  const metricaAprovada = false // B4-203: pendente de aprovação do champion — não inferir métrica
  const fonte = 'CRM (collection leads) + espelho Meta (SPEC-4-001)'
  const periodoTexto =
    periodo === 'tudo' ? 'Todos os períodos' : `Últimos ${periodo} dias`

  return (
    <section aria-label="Comparação de leads por campanha" className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-semibold text-slate-900">Comparação de leads por campanha</h2>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">CRM ao vivo</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fonte: {fonte} · Período: {periodoTexto} · Consulta read-only — não altera dados nem regras.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(['30', '90', 'tudo'] as const).map((p) => (
              <button key={p} type="button" onClick={() => setPeriodo(p)}
                className={`px-2.5 py-1 rounded-md border text-xs font-medium ${periodo === p ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {p === 'tudo' ? 'Tudo' : `${p}d`}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => void loadLeadsReal()} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />Atualizar
          </button>
        </div>
      </div>

      {error && (
        <div className="m-4 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2">
          <CircleAlert className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-semibold">
              <th className="py-3 px-4 min-w-[240px]">Campanha</th>
              <th className="py-3 px-4 min-w-[110px]">Origem</th>
              <th className="py-3 px-4 min-w-[100px]">Recebidos</th>
              <th className="py-3 px-4 min-w-[140px]">Qualificados</th>
              <th className="py-3 px-4 min-w-[100px]">Agendados</th>
              <th className="py-3 px-4 min-w-[100px]">Convertidos</th>
              <th className="py-3 px-4 min-w-[180px]">Proveniência</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && <tr><td colSpan={7} className="py-8 px-4 text-center text-slate-400">Carregando dados reais do CRM...</td></tr>}
            {!loading && linhas.length === 0 && (
              <tr><td colSpan={7} className="py-8 px-4 text-center text-slate-400">
                Nenhuma campanha com leads no período selecionado — vazio não é zero.
              </td></tr>
            )}
            {!loading && linhas.map((l) => (
              <tr key={l.chave} className="hover:bg-blue-50/40 align-top">
                <td className="py-3 px-4 font-semibold text-slate-900">{l.chave}</td>
                <td className="py-3 px-4 text-slate-700">{l.origem}</td>
                <td className="py-3 px-4 text-slate-900 font-medium">{l.recebidos}</td>
                <td className="py-3 px-4">
                  {!metricaAprovada ? (
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700">
                      Pendente B4-203 — métrica de qualidade aguarda aprovação do champion
                    </span>
                  ) : l.qualificados === null || !l.temQualificacao ? (
                    <span className="text-slate-400" title="Sem dado — vazio não é zero">{SEM_DADO}</span>
                  ) : (
                    <span className="text-slate-900 font-medium">{l.qualificados}</span>
                  )}
                </td>
                <td className="py-3 px-4 text-slate-900">{l.agendados}</td>
                <td className="py-3 px-4 text-slate-900">{l.convertidos}</td>
                <td className="py-3 px-4 text-[11px] text-slate-500">
                  {l.temMeta ? 'Espelho Meta (SPEC-4-001)' : 'Somente dados internos do CRM'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-200/80 text-[11px] text-slate-500">
        Sem métrica de qualidade aprovada pelo champion (B4-203), a coluna de qualificados exibe pendência em vez de número — vazio nunca vira zero (RN-4-204).
        Nenhum contato parte desta tela; consulta read-only.
      </div>
    </section>
  )
}

export default PainelQualidadeCampanha
