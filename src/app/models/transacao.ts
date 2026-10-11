import { Categoria } from "./categoria";

export interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: 'RECEITA' | 'DESPESA';
    data: string;
    categoria: Categoria;
}