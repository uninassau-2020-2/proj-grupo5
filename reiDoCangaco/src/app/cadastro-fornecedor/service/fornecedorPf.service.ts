import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FornecedorPf } from 'src/app/models/fornecedorPf.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorPfService {

  readonly apiUrl = 'http://127.0.0.1:5000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 constructor(private readonly _HTTP: HttpClient) { }


   getAllFornecedorPf(): Observable<FornecedorPf[]> {
       return this._HTTP.get<FornecedorPf[]>(this.apiUrl + '/fornecedorespf', {});
   }
   getFornecedorPfById(idFornecedorPf: string): Observable<any> {
       return this._HTTP.get(this.apiUrl + '/fornecedorespf/?id=' + idFornecedorPf);
   }
   saveFornecedorPf(fornecedorPf: FornecedorPf): Observable<FornecedorPf> {
       return this._HTTP.post<FornecedorPf>(this.apiUrl + '/fornecedorespf', fornecedorPf, this.httpOptions);
   }
   editFornecedorPf(fornecedorPf: FornecedorPf): Observable<any> {

     return this._HTTP.put(this.apiUrl + '/fornecedorespf', fornecedorPf, this.httpOptions);
   }
   deleteFornecedorPf(id: string): Observable<any> {
       return this._HTTP.delete(this.apiUrl + '/fornecedorespf/' + id, this.httpOptions);
   }

}
