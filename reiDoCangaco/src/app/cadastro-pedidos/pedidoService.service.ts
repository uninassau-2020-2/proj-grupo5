import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedidos } from '../models/pedidos.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  readonly apiUrl = 'http://localhost:5000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 constructor(private readonly _HTTP: HttpClient) { }


   getAllPedido(): Observable<Pedidos[]> {
       return this._HTTP.get<Pedidos[]>(this.apiUrl + 'pedidos', {});
   }
   getPedidosById(idPedidos: string): Observable<any> {
       return this._HTTP.get(this.apiUrl + '/pedidos/?id=' + idPedidos);
   }
   savePedidos(pedidos: Pedidos): Observable<Pedidos> {
       return this._HTTP.post<Pedidos>(this.apiUrl + 'pedidos', pedidos, this.httpOptions);
   }
   editPedidos(pedidos: Pedidos): Observable<any> {
      return this._HTTP.put(this.apiUrl + 'pedidos', pedidos, this.httpOptions);
   }
   deletePedidos(id: string): Observable<any> {
       return this._HTTP.delete(this.apiUrl + 'pedidos/' + id, this.httpOptions);
   }

  }
