/* CRM Oficial — Página Fila de Recuperação (error_log) */
import { useEffect, useState } from 'react'
import pb from '@/lib/pocketbase/client'

interface ErrorItem {
  id: string
  error_id: string
  received_at: string
  categoria: string
  resumo: string
  estado: string
  dono: string
  proxima_acao: string
  tentativa: number
  resolvido_em: string
  resolvido_por: string
  resultado: string
  created: string
}

const estadoColors: Record<string, string> = {
  manual_review: 'bg-yellow-100 text-yellow-800',
  resolvido: 'bg-green-100 text-green-800',
  encerrado: 'bg-gray-100 text-gray-800',
}

const categoriaColors: Record<string, string> = {
  validacao: 'bg-red-100 text-red-800',
  permissao: 'bg-orange-100 text-orange-800',
  disponibilidade: 'bg-purple-100 text-purple-800',
  schema: 'bg-blue-100 text-blue-800',
  timeout: 'bg-cyan-100 text-cyan-800',
  outro: 'bg-gray-100 text-gray-800',
}

const Fila = () => {
  const [itens, setItens] = useState<ErrorItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = pb.authStore.model
    if (currentUser) setUser(currentUser)
    fetchItens()
  }, [])

  const fetchItens = async () => {
    try {
      setLoading(true)
      const records = await pb.collection('error_log').getFullList({ sort: '-created' })
      setItens(records as unknown as ErrorItem[])
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar fila de recuperação')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">CRM Oficial</h1>
            <p className="mt-2 text-gray-600">Fila de Recuperação — Terceirizou</p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={async () => {
                try {
                  await pb.collection('users').authWithPassword('vinicius@terceirizou.com.br', 'Terceirizou@2026')
                  setUser(pb.authStore.model)
                  fetchItens()
                } catch (err: any) { setError(err.message || 'Erro ao fazer login') }
              }}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Entrar como Administrador
            </button>
            {error && <div className="text-red-600 text-sm text-center mt-2">{error}</div>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fila de Recuperação</h1>
            <p className="text-sm text-gray-500">Terceirizou — Erros de entrada</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.name || user.email}</span>
            <button onClick={() => { pb.authStore.clear(); setUser(null); setItens([]) }} className="text-sm text-red-600 hover:text-red-800">Sair</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Total na Fila</div>
            <div className="text-2xl font-bold text-gray-900">{itens.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Em Revisão</div>
            <div className="text-2xl font-bold text-yellow-600">{itens.filter((i) => i.estado === 'manual_review').length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Resolvidos</div>
            <div className="text-2xl font-bold text-green-600">{itens.filter((i) => i.estado === 'resolvido').length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500">Encerrados</div>
            <div className="text-2xl font-bold text-gray-600">{itens.filter((i) => i.estado === 'encerrado').length}</div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Itens de Recuperação</h2>
            <button onClick={fetchItens} className="text-sm text-indigo-600 hover:text-indigo-800">Atualizar</button>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-500">Carregando...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : itens.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Nenhum item na fila de recuperação</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resumo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próxima Ação</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recebido em</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {itens.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.error_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoriaColors[item.categoria] || 'bg-gray-100 text-gray-800'}`}>{item.categoria}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.resumo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${estadoColors[item.estado] || 'bg-gray-100 text-gray-800'}`}>{item.estado}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dono}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.proxima_acao}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.created).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Fila