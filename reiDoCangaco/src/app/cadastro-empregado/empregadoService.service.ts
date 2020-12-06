import { Empregado } from './../models/empregado.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpregadoService {

  readonly apiUrl = 'http://127.0.0.1:5000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
 constructor(private readonly _HTTP: HttpClient) { }


   getAllEmpregado(): Observable<Empregado[]> {
       return this._HTTP.get<Empregado[]>(this.apiUrl + '/empregados', {});
   }
   getEmpregadoById(idEmpregado: string): Observable<any> {
       return this._HTTP.get(this.apiUrl + '/empregado/?id=' + idEmpregado);
   }
   saveEmpregado(empregado: Empregado): Observable<Empregado> {
       return this._HTTP.post<Empregado>(this.apiUrl + '/empregados', empregado, this.httpOptions);
   }
   editEmpregado(empregado: Empregado): Observable<any> {

     return this._HTTP.put(this.apiUrl + '/empregados', empregado, this.httpOptions);
   }
   deleteEmpregado(id: string): Observable<any> {
       return this._HTTP.delete(this.apiUrl + '/empregados/' + id, this.httpOptions);
   }

}
