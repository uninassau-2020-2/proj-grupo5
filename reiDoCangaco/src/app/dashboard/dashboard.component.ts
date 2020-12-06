import { PedidoService } from './../cadastro-pedidos/pedidoService.service';
import { Pedidos } from './../models/pedidos.model';
import { Chart } from 'chart.js';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 pedidosList: Pedidos [] = [];
 finalizados: number;
 @ViewChild('canvas, canvas2', {static: true}) element: ElementRef;
 @ViewChild('canvas2', {static: true}) element2: ElementRef;
 @ViewChild('canvas3', {static: true}) element3: ElementRef;

  constructor(private readonly pedidoService: PedidoService) {}

  ngOnInit() {

    this.pedidoService.getAllPedido().subscribe((pedido: Pedidos[]) => {
      this.pedidosList = (!!pedido) ? pedido : [];
    });
    this.totalPedidoStatus();

    // Total de vendas por mês
    // tslint:disable-next-line: no-unused-expression
    new Chart(this.element.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março',
        'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
          {
            label: 'Total de vendas por mês',
            data: [50, 147, 233, 338, 155, 68, 40, 55, 68, 100, 77, 100],
            options: {
              tooltips: {
                mode: 'point'
            },
              animation: {
                  duration: 0 // general animation time
              },
              hover: {
                  animationDuration: 0 // duration of animations when hovering an item
              },
              responsiveAnimationDuration: 0 // animation duration after a resize

          },
            backgroundColor: [
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
          ]
          }
        ]
      }
     });


     // Total de pedidos (Abertos, Cancelados e Finalizados)
     // tslint:disable-next-line: no-unused-expression
    new Chart(this.element2.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Abertos', 'Cancelados', 'Finalizados'],
        datasets: [
          {
            label: 'Total de pedidos (Abertos, Cancelados e Finalizados)',
            data: [73, 127, this.finalizados],
            options: {
              tooltips: {
                mode: 'point'
            },
              animation: {
                  duration: 2 // general animation time
              },
              hover: {
                  animationDuration: 2 // duration of animations when hovering an item
              },
              responsiveAnimationDuration: 0 // animation duration after a resize

          },
            backgroundColor: [
              'rgb(216,67,21)',
              'rgb(255,193,7)',
              'rgb(0,172,193)',
          ]
          }
        ]
      }
     });

     // Total de pedidos em aberto no mês
    // tslint:disable-next-line: no-unused-expression
    new Chart(this.element3.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março',
        'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
          {
            label: 'Total de pedidos em aberto no mês',
            data: [100, 147, 233, 238, 155, 68, 200, 55, 308, 100, 277, 100],
            options: {
              tooltips: {
                mode: 'point'
            },

          },
            backgroundColor: [
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
              'rgb(216,67,21)',
          ]
          }
        ]
      }
     });
  }


 private totalPedidoStatus(): number {
  
   this.pedidosList.forEach((p: Pedidos) => {
    if (p.statusPedito === 'Finalizado') {
        return this.finalizados += 1;
      }
    });

   return this.finalizados;

 }

}
