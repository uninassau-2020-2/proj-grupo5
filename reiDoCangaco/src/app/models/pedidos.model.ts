export interface Pedidos {
    idPedido?: string;
    dataPedido: string;
    quantidade?: string;
    descProduto?: string;
    statusPedito: string;
    preco?: string;
    tipoVolume?: string;
    idUser: string;
    lista?: any [];
}


export interface PeriodicElement {
    idPedido?: string;
    dataPedido?: string;
    quantidade?: string;
    descProduto?: string;
    statusPedito?: string;
    preco?: string;
    valorTotal: string;
    tipoVolume?: string;
    idUser?: string;
    userName?: string;
    listaProdutos?: any [];
  }


export const ELEMENT_DATA: PeriodicElement[] = [
    {
      idPedido: '1',
      userName: 'Daniel Lira',
      valorTotal: '1.0079',
      dataPedido: '22/11/2020',
      listaProdutos: [
            {
                idProduto: '1019',
                descProduto: 'Queijo Coalho',
                tipoVolume: 'KG',
                preco: 100.34
            },
            {
                idProduto: '1012',
                descProduto: 'Queijo Prato',
                tipoVolume: 'KG',
                preco: 300.34
            },
            {
                idProduto: '1016',
                descProduto: 'Queijo Manteiga',
                tipoVolume: 'KG',
                preco: 500.34
            }
    ]

},

    {
            idPedido: '2',
            userName: 'Administrador',
            valorTotal: '3.0079',
            dataPedido: '25/11/2020',
            listaProdutos: [
                    {
                        idProduto: '1012',
                        descProduto: 'Queijo Prato',
                        tipoVolume: 'KG',
                        preco: 100.34
                    },
                    {
                        idProduto: '1013',
                        descProduto: 'Queijo Manteiga',
                        tipoVolume: 'KG',
                        preco: 300.34
                    },
                    {
                        idProduto: '1014',
                        descProduto: 'Manteiga',
                        tipoVolume: 'KG',
                        preco: 500.34
                    }
            ],
        },

        {
            idPedido: '3',
            userName: 'Rafael Joaquim',
            valorTotal: '2.0079',
            dataPedido: '26/11/2020',
            listaProdutos: [
                    {
                        idProduto: '1012',
                        descProduto: 'Queijo Prato',
                        tipoVolume: 'KG',
                        preco: 100.34
                    },
                    {
                        idProduto: '1013',
                        descProduto: 'Queijo Manteiga',
                        tipoVolume: 'KG',
                        preco: 300.34
                    },
                    {
                        idProduto: '1014',
                        descProduto: 'Manteiga',
                        tipoVolume: 'KG',
                        preco: 500.34
                    }
            ],
        },

        {
            idPedido: '4',
            userName: 'TESTE',
            valorTotal: '579',
            dataPedido: '30/11/2020',
            listaProdutos: [
                    {
                        idProduto: '1012',
                        descProduto: 'Queijo Prato',
                        tipoVolume: 'KG',
                        preco: 100.34
                    },
                    {
                        idProduto: '1013',
                        descProduto: 'Queijo Manteiga',
                        tipoVolume: 'KG',
                        preco: 300.34
                    },
                    {
                        idProduto: '1014',
                        descProduto: 'Manteiga',
                        tipoVolume: 'KG',
                        preco: 500.34
                    }
            ],
        },

  ];
