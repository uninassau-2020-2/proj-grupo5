import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PedidoService } from '../cadastro-pedidos/pedidoService.service';
import { ELEMENT_DATA, Pedidos, PeriodicElement } from '../models/pedidos.model';
import { ModalDetalhesVendaComponent } from '../shared/component/modals/modalDetalhesVenda/modalDetalhesVenda.component';


@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VendasComponent implements OnInit {
  filterFormProduto: FormGroup;
  pedidoList: Pedidos [];
  pedidosReduce: any [] = [];
  displayedColumns: string[] = ['codigo', 'valorTotal', 'dataPedido', 'detalhe'];
  dataSource = new MatTableDataSource<Pedidos>();
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  dataSource2 = ELEMENT_DATA;
  columnsToDisplay: string[] = ['codigo', 'valorTotal', 'dataPedido', 'expand'];
  expandedElement: PeriodicElement;

  constructor(private readonly formBuilder: FormBuilder,
              public dialog: MatDialog,
              private readonly pedidoService: PedidoService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.filterFormProduto = this.formBuilder.group({
      descricaoFilterCtrl: ['']
    });

    this.pedidoService.getAllPedido().subscribe((pedido: Pedidos[]) => {
      this.pedidoList = (!!pedido) ? pedido : [];

      // const pedidosAgrupados = this.pedidoList.reduce((acc, obj) => {
      //   const id = obj.idPedido;
      //   if (!acc[id]) {
      //     acc[id] = [];
      //   }
      //   acc[id].push(obj);
      //   return acc;
      // }, []);

      // console.log(this.pedidoList);
      // this.pedidosReduce.push(pedidosAgrupados);

      // console.log(pedidosAgrupados);
      // console.log( this.dataSource.data);

      this.pedidoList.forEach(e => {

      });

      this.dataSource.data = [...this.pedidoList];
    });

    this.dataSource.paginator = this.MatPaginator;
  }


  filterTabelaPedido(): void {
    let filteredTable: Pedidos[] = this.pedidoList;
    if (!this.filterFormProduto.value.descricaoFilterCtrl) {
      this.dataSource.data = [...this.pedidoList];
    }
    if (this.filterFormProduto.value.descricaoFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x => {
        return x.descProduto ? x.descProduto.toUpperCase().includes(this.filterFormProduto.value.descricaoFilterCtrl.toUpperCase()) : null;
      });
     }
    this.dataSource.data = filteredTable;
  }

  // openVendasDetalhes(p: Pedidos): void {
  //   this.dialog.open(ModalDetalhesVendaComponent, {
  //     data: {
  //       desc: p.descProduto,
  //       volume: p.tipoVolume,
  //       preco: p.preco,
  //       quantidade: p.quantidade

  //     }
  //   });
  // }

}
