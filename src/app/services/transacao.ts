import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { Transacao } from '../models/transacao';
import { TransacaoRequest } from '../models/transacao-request';
import { Pagina } from '../models/pagina';
import { SaldoResponse } from '../models/saldo-response';

@Service()
export class TransacaoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/transacoes';

  listarTransacoes(page: number, size: number) {
    return this.http.get<Pagina<Transacao>>(this.apiUrl, {
      params: {
        page: page,
        size: size,
        sort: 'data,desc'
      }
    });
  }

  salvarTransacao(transacao: TransacaoRequest) {
    return this.http.post<Transacao>(
      this.apiUrl, transacao
    );
  }

  calcularSaldo() {
    return this.http.get<SaldoResponse>(`${this.apiUrl}/saldo`);
  }

  excluirTransacao(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarTransacao(id: number, transacao: TransacaoRequest) {
    return this.http.put<void>(`${this.apiUrl}/${id}`, transacao);
  }

  pesquisarTransacoes(tipo: 'RECEITA' | 'DESPESA' | null, descricao: string,
    page: number, size: number) {
    const params: Record<string, string | number> = {
      page: page, size: size, sort: 'data,desc'
    };
    if (tipo != null) {
      params[`tipo`] = tipo;
    }
    if (descricao.trim() !== '') {
      params[`descricao`] = descricao;
    }
    return this.http.get<Pagina<Transacao>>(`${this.apiUrl}/pesquisa`, {params: params});
  }
  pesquisarPorData(data: string) {
  return this.http.get<Transacao[]>(`${this.apiUrl}/data`, {params: {data: data}});
  }
  pesquisarPorPeriodo(inicio: string, fim: string){
    return this.http.get<Transacao[]>(`${this.apiUrl}/periodo`, {params: {inicio: inicio, fim: fim}});
  }
  calcularSaldoPorPeriodo(inicio: string, fim: string) {
        return this.http.get<SaldoResponse>(`${this.apiUrl}/saldo/periodo`, {params: {inicio: inicio, fim: fim}});
  }
}

