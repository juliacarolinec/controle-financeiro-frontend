import { Component, inject, OnInit, signal } from '@angular/core';
import { Transacao } from '../../models/transacao';
import { TransacaoService } from '../../services/transacao';

@Component({
  selector: 'app-transacao-list',
  imports: [],
  templateUrl: './transacao-list.html',
  styleUrl: './transacao-list.css'
})
export class TransacaoList implements OnInit {

  private service = inject(TransacaoService);

  transacoes = signal<Transacao[]>([]);

  paginaAtual = signal(0);
  totalPaginas = signal(0);
  carregando = signal(false);

  tamanhoPagina = 5;

  ngOnInit() {
    this.carregarTransacoes();
  }

  carregarTransacoes() {
    this.carregando.set(true);

    this.service.listarTransacoes(
      this.paginaAtual(),
      this.tamanhoPagina
    ).subscribe({
      next: (pagina) => {
        this.transacoes.set(pagina?.content ?? []);
        this.totalPaginas.set(pagina?.totalPages ?? 0);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao buscar transações:', erro);
        this.carregando.set(false);
      }
    });
  }

  proximaPagina() {
    if (this.paginaAtual() < this.totalPaginas() - 1 && !this.carregando()) {
      this.paginaAtual.update(atual => atual + 1);
      this.carregarTransacoes();
    }
  }

  paginaAnterior() {
    if (this.paginaAtual() > 0 && !this.carregando()) {
      this.paginaAtual.update(atual => atual - 1);
      this.carregarTransacoes();
    }
  }
}