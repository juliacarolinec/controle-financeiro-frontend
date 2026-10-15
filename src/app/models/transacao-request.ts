export interface TransacaoRequest{
    descricao: string;
    valor: number;
    tipo: 'RECEITA' | 'DESPESA';
    data: string;
    categoriaId: number;
}