import { Component, inject, signal, viewChild} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { TransacaoList } from './components/transacao-list/transacao-list';
import { TransacaoForm } from './components/transacao-form/transacao-form';
import { TransacaoService } from './services/transacao';
import { Transacao } from './models/transacao';

registerLocaleData(localePt);

@Component({
  imports: [TransacaoList, TransacaoForm, CurrencyPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  titulo = 'Controle Financeiro';
  saldo = signal<number>(0);
  private transacaoService = inject(TransacaoService);

  ngOnInit() {
  this.carregarSaldo();
  }

  listaTransacoes = viewChild(TransacaoList);

  atualizarLista() {
  this.listaTransacoes()?.carregarTransacoes();
  this.carregarSaldo();
  this.formularioVisivel.set(false);
  this.transacaoEmEdicao.set(null);
  }

  formularioVisivel = signal(false);

  alterarFormulario(){
    this.transacaoEmEdicao.set(null);
    this.formularioVisivel.update(atual => !atual);
  }

  carregarSaldo(){
    this.transacaoService.calcularSaldo().subscribe({
      next: (resposta) => {
        this.saldo.set(resposta.saldo);
      },
      error: (erro) => {
        console.error('Erro ao carregar saldo:', erro);
      }
    });
  }

  transacaoEmEdicao = signal<Transacao | null>(null);

  iniciarEdicao(transacao: Transacao){
    this.transacaoEmEdicao.set(transacao);
    this.formularioVisivel.set(true);
  }
}
