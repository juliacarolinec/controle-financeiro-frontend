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
        size: size
      }
    });
    }

    salvarTransacao(transacao: TransacaoRequest){
      return this.http.post<Transacao>(
        this.apiUrl, transacao
      );
    }

    calcularSaldo(){
      return this.http.get<SaldoResponse>(`${this.apiUrl}/saldo`);
    }
}

