import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { Transacao } from '../models/transacao';
import { Pagina } from '../models/pagina';

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
}

