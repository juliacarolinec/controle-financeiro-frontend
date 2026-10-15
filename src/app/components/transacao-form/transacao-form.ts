import { Component, inject, signal, OnInit, output } from '@angular/core';
import { TransacaoRequest } from '../../models/transacao-request';
import { TransacaoService } from '../../services/transacao';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria';
import { Categoria } from '../../models/categoria';

@Component({
  imports: [FormsModule],
  selector: 'app-transacao-form',
  styleUrl: './transacao-form.css',
  templateUrl: './transacao-form.html',
})
export class TransacaoForm implements OnInit{
  private service = inject(TransacaoService);
  private categoriaService = inject(CategoriaService);
  transacaoAdicionada = output<void>();

  categorias = signal<Categoria[]>([]);

  descricao = '';
  valor: number | null = null;
  tipo: 'RECEITA' | 'DESPESA' = 'DESPESA';
  data = '';
  categoriaId: number | null = null;

  mensagem = signal('');
  tipoMensagem = signal<'sucesso'|'erro'|null>(null);


  salvar(){
    if ( !this.descricao.trim() || this.valor === null || !this.data || this.categoriaId === null) {
      this.mensagem.set('Preencha todos os campos.');
      this.tipoMensagem.set('erro');
      return;
    }
    
     const transacao: TransacaoRequest = {
      descricao: this.descricao,
      valor: this.valor,
      tipo: this.tipo,
      data: this.data,
      categoriaId: this.categoriaId
    };

     this.service.salvarTransacao(transacao).subscribe({
      next: (resposta) => {
        console.log('Transação cadastrada:', resposta);
        this.mensagem.set('Transação cadastrada com sucesso!');
        this.tipoMensagem.set('sucesso');
      },
      error: (erro) => {
        console.error('Erro ao cadastrar:', erro);
        this.mensagem.set('Não foi possível cadastrar a transação.');
        this.tipoMensagem.set('erro');
      }
    });
  }

  ngOnInit() {
  this.carregarCategorias();
}

carregarCategorias() {
  this.categoriaService.listarCategorias(0, 100).subscribe({
    next: (pagina) => {
       console.log('Categorias recebidas:', pagina);
      this.categorias.set(pagina.content);
    },
    error: (erro) => {
      console.error('Erro ao buscar categorias:', erro);
    }
  });
}
}
