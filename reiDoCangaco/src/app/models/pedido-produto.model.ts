export interface PedidoProduto {
  idPedido?: string;
  idProduto?: string;
  descProduto?: string;
  precoProduto: number;
  tipoVolume: string;
  quantidadeProduto: number;
  valorTotalProduto: number;
}
