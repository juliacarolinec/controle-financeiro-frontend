import { Component } from '@angular/core';
import { TransacaoList } from './components/transacao-list/transacao-list';

@Component({
  imports: [TransacaoList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  titulo = 'Controle Financeiro';
  saldo = 2500;
}
