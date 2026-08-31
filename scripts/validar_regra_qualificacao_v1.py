#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Valida a regra de qualificacao v1 (F2-T01) contra a amostra sintetica.

Uso: python3 scripts/validar_regra_qualificacao_v1.py
Saida esperada: 6 PASS e saida 0.
"""
import json
import os
import sys

CAMINHO_REGRA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'config', 'regra_qualificacao_v1.json')


def normalizar(v):
    if v is None:
        return ''
    return str(v).strip().lower().replace('_', ' ').strip()


def decisao(regra, r):
    prest = normalizar(r.get('prestador'))
    seg = normalizar(r.get('segmento'))
    cargo = normalizar(r.get('cargo'))
    fat = normalizar(r.get('faturamento'))
    carteira = [normalizar(x) for x in regra['modelo_negocio']['carteira_segmentos']]
    excluidos = [normalizar(x) for x in regra['modelo_negocio']['segmentos_excluidos']]
    pesos = regra['pesos']
    min_qual = regra['limiares']['qualificado_minimo']

    # 1. prestador negativo explicito
    if prest in ('nao', 'não', 'false', '0', 'n'):
        return 'nao_qualificado', None, 'prestador negativo explicito'
    # 2. conflito prestador x segmento
    if (prest in ('sim', 's') and seg in excluidos) or (prest in ('nao', 'não') and seg in carteira):
        return 'pendente_revisao', None, 'conflito prestador x segmento'
    # 3. segmento excluido conhecido
    if seg in excluidos:
        return 'nao_qualificado', None, 'segmento fora do perfil (comercio/industria)'
    # 4. dados criticos ausentes
    if not seg or not cargo:
        return 'pendente_revisao', None, 'dados criticos ausentes'
    # 5. segmento nao mapeado
    if seg not in carteira:
        return 'excecao', None, 'segmento nao mapeado'
    # 6. score
    score = 0
    if seg in carteira:
        score += pesos['segmento_na_carteira']
    if fat:
        score += pesos['receita_ou_faturamento_informado']
    decisores = ('socio', 'proprietario', 'diretor', 'gerente', 'ceo', 'administrador', 'dono')
    if any(d in cargo for d in decisores):
        score += pesos['cargo_decisor']
    if seg in excluidos:
        score += pesos['segmento_excluido']
    if score >= min_qual:
        return 'qualificado', score, 'score acima do limiar'
    return 'pendente_revisao', score, 'score abaixo do limiar'


def main():
    regra = json.load(open(CAMINHO_REGRA, encoding='utf-8'))
    amostra = regra['amostra_sintetica']
    falhas = 0
    for caso in amostra:
        estado, score, motivo = decisao(regra, caso.get('respostas', {}))
        ok = estado == caso['esperado']
        if not ok:
            falhas += 1
        print(('PASS' if ok else 'FAIL'), caso['id'], '->', estado,
              '| esperado:', caso['esperado'], '| score:', score, '|', motivo)
    print('\nTotal:', len(amostra), '| Falhas:', falhas)
    sys.exit(1 if falhas else 0)


if __name__ == '__main__':
    main()