import { Component, inject, signal, OnInit, output, input, effect } from '@angular/core';
import { TransacaoRequest } from '../../models/transacao-request';
import { TransacaoService } from '../../services/transacao';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria';
import { Categoria } from '../../models/categoria';
import { Transacao } from '../../models/transacao';

@Component({
  imports: [FormsModule],
  selector: 'app-transacao-form',
  styleUrl: './transacao-form.css',
  templateUrl: './transacao-form.html',
})
export class TransacaoForm implements OnInit {
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
  tipoMensagem = signal<'sucesso' | 'erro' | null>(null);
  transacaoParaEditar = input<Transacao | null>(null);

  constructor() {
    effect(() => {
      const transacao = this.transacaoParaEditar();

      if (transacao) {
        this.descricao = transacao.descricao;
        this.valor = transacao.valor;
        this.tipo = transacao.tipo;
        this.data = transacao.data;
        this.categoriaId = transacao.categoria.id;
      }
    });
  }

  salvar() {
    if (!this.descricao.trim() || this.valor === null || !this.data || this.categoriaId === null) {
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

    const transacaoEmEdicao = this.transacaoParaEditar();

    if (transacaoEmEdicao) {
      this.service.atualizarTransacao(transacaoEmEdicao.id, transacao).subscribe({
        next: (resposta) => {
          console.log('Transação atualizada', resposta);
          this.mensagem.set('Transação atualizada com sucesso!');
          this.tipoMensagem.set('sucesso');
          this.transacaoAdicionada.emit();
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
          this.mensagem.set('Não foi possível atualizar a transação.');
          this.tipoMensagem.set('erro');
        }
      });
    } else {

      this.service.salvarTransacao(transacao).subscribe({
        next: (resposta) => {
          console.log('Transação cadastrada:', resposta);
          this.mensagem.set('Transação cadastrada com sucesso!');
          this.tipoMensagem.set('sucesso');
          this.limparFormulario();
          this.transacaoAdicionada.emit();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          this.mensagem.set('Não foi possível cadastrar a transação.');
          this.tipoMensagem.set('erro');
        }
      });
    }
  }


  limparFormulario() {
    this.descricao = '';
    this.valor = null;
    this.tipo = 'DESPESA';
    this.data = '';
    this.categoriaId = null;
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
