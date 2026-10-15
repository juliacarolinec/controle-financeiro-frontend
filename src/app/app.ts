import { Component, signal, viewChild } from '@angular/core';
import { TransacaoList } from './components/transacao-list/transacao-list';
import { TransacaoForm } from './components/transacao-form/transacao-form';

@Component({
  imports: [TransacaoList, TransacaoForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  titulo = 'Controle Financeiro';
  saldo = 2500;
  listaTransacoes = viewChild(TransacaoList);
  atualizarLista() {
  this.listaTransacoes()?.carregarTransacoes();
  this.formularioVisivel.set(false);
  }
  formularioVisivel = signal(false);
  alterarFormulario(){
    this.formularioVisivel.update(atual => !atual);
  }
}
