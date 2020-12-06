import { FornecedorPj } from './../../models/fornecedorPj.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorPjService {

  readonly apiUrl = 'http://127.0.0.1:5000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 constructor(private readonly _HTTP: HttpClient) { }


   getAllFornecedorPj(): Observable<FornecedorPj[]> {
       return this._HTTP.get<FornecedorPj[]>(this.apiUrl + '/fornecedorespj', {});
   }
   getFornecedorPjById(idFornecedorPj: string): Observable<any> {
       return this._HTTP.get(this.apiUrl + '/fornecedorespj/?id=' + idFornecedorPj);
   }
   saveFornecedorPj(fornecedorPj: FornecedorPj): Observable<FornecedorPj> {
       return this._HTTP.post<FornecedorPj>(this.apiUrl + '/fornecedorespj', fornecedorPj, this.httpOptions);
   }
   editFornecedorPj(fornecedorPj: FornecedorPj): Observable<any> {

     return this._HTTP.put(this.apiUrl + '/fornecedorespj', fornecedorPj, this.httpOptions);
   }
   deleteFornecedorPj(id: string): Observable<any> {
       return this._HTTP.delete(this.apiUrl + '/fornecedorespj/' + id, this.httpOptions);
   }

}
