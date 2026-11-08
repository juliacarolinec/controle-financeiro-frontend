import { Component, inject, OnInit, output, signal } from '@angular/core';
import { Transacao } from '../../models/transacao';
import { TransacaoService } from '../../services/transacao';
import { Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SaldoResponse } from '../../models/saldo-response';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-transacao-list',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './transacao-list.html',
  styleUrl: './transacao-list.css'
})
export class TransacaoList implements OnInit {

  private service = inject(TransacaoService);

  transacoes = signal<Transacao[]>([]);

  transacaoExcluida = output<void>();

  transacaoSelecionada = output<Transacao>();

  paginaAtual = signal(0);
  totalPaginas = signal(0);
  carregando = signal(false);

  tamanhoPagina = 5;

  filtroTipo = signal<'RECEITA' | 'DESPESA' | null>(null);
  filtroDescricao = signal('');
  filtroData = signal('');
  filtroInicio = signal('');
  filtroFim = signal('');
  modoData = signal<'nenhum' | 'especifica' | 'periodo'>('nenhum');
  saldoPeriodo = signal<SaldoResponse | null>(null);

  ngOnInit() {
    this.carregarTransacoes();
  }


  carregarTransacoes() {
    this.carregando.set(true);

    if (this.modoData() !== 'periodo') {
      this.saldoPeriodo.set(null);
    }

    if (this.modoData() === 'periodo') {

      if (this.filtroInicio() === '' || this.filtroFim() === '') {
        alert('Preencha a data inicial e a data final.');
        this.carregando.set(false);
        return;
      }

      if (this.filtroInicio() > this.filtroFim()) {
        alert('A data inicial não pode ser posterior à data final.');
        this.carregando.set(false);
        return;
      }

      this.saldoPeriodo.set(null);
      this.carregarSaldoPeriodo();

      this.service.pesquisarPorPeriodo(
        this.filtroInicio(),
        this.filtroFim()
      ).subscribe({
        next: (transacoes) => {
          this.transacoes.set(transacoes ?? []);
          this.totalPaginas.set(1);
          this.paginaAtual.set(0);
          this.carregando.set(false);
        },
        error: (erro) => {
          console.error('Erro ao pesquisar por período:', erro);
          this.carregando.set(false);
        }
      });

      return;
    }

    if (this.modoData() === 'especifica') {

      if (this.filtroData() === '') {
        alert('Selecione uma data para pesquisar.');
        this.carregando.set(false);
        return;
      }

      this.service.pesquisarPorData(this.filtroData()).subscribe({
        next: (transacoes) => {
          this.transacoes.set(transacoes ?? []);
          this.totalPaginas.set(1);
          this.paginaAtual.set(0);
          this.carregando.set(false);
        },
        error: (erro) => {
          console.error('Erro ao pesquisar por data:', erro);
          this.carregando.set(false);
        }
      });

      return;
    }

    let requisicao;

    if (this.filtroTipo() !== null || this.filtroDescricao().trim() !== '') {
      requisicao = this.service.pesquisarTransacoes(
        this.filtroTipo(),
        this.filtroDescricao(),
        this.paginaAtual(),
        this.tamanhoPagina
      );
    } else {
      requisicao = this.service.listarTransacoes(
        this.paginaAtual(),
        this.tamanhoPagina
      );
    }

    requisicao.subscribe({
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


  excluirTransacao(id: number) {
    const confirmado = window.confirm(
      'Tem certeza de que deseja excluir esta transação?'
    );

    if (!confirmado) {
      return;
    }

    this.service.excluirTransacao(id).subscribe({
      next: () => {
        if (this.transacoes().length === 1 && this.paginaAtual() > 0) {
          this.paginaAtual.set(this.paginaAtual() - 1);
        }
        this.carregarTransacoes();
        this.transacaoExcluida.emit();
      },
      error: (erro) => {
        console.error('Erro ao excluir transação: ', erro);
      }
    });
  }

  editarTransacao(transacao: Transacao) {
    this.transacaoSelecionada.emit(transacao);
  }

  carregarSaldoPeriodo() {
    this.service.calcularSaldoPorPeriodo(
      this.filtroInicio(),
      this.filtroFim()
    ).subscribe({
      next: (resumo) => {
        this.saldoPeriodo.set(resumo);
      },
      error: (erro) => {
        console.error('Erro ao calcular saldo do período:', erro);
        this.saldoPeriodo.set(null);
      }
    });
  }

  aplicarFiltros() {
    this.paginaAtual.set(0);
    this.carregarTransacoes();
  }

  limparFiltros() {
    this.filtroDescricao.set('');
    this.filtroTipo.set(null);
    this.filtroData.set('');
    this.filtroInicio.set('');
    this.filtroFim.set('');
    this.modoData.set('nenhum');
    this.saldoPeriodo.set(null);
    this.paginaAtual.set(0);
    this.carregarTransacoes();
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