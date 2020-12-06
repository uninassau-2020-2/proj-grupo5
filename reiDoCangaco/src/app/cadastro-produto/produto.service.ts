import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from '../models/produto.model';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  readonly apiUrl = 'http://localhost:5000/';

   httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };
  constructor(private readonly _HTTP: HttpClient) { }


    getAllProduto(): Observable<Produto[]> {
        return this._HTTP.get<Produto[]>(this.apiUrl + 'produtos', {});
    }
    getProdutoById(idProduto: string): Observable<any> {
        return this._HTTP.get(this.apiUrl + '/Produto/?id=' + idProduto);
    }
    saveProduto(produto: Produto): Observable<Produto> {
        return this._HTTP.post<Produto>(this.apiUrl + 'produtos', produto, this.httpOptions);
    }
    editProduto(produto: Produto): Observable<any> {
       return this._HTTP.put(this.apiUrl + 'produtos', produto, this.httpOptions);
    }
    deleteProduto(id: string): Observable<any> {
        return this._HTTP.delete(this.apiUrl + 'produtos/' + id, this.httpOptions);
    }
}
