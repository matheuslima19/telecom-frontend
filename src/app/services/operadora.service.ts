import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operadora } from '../pages/operadoras/operadoras.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {
  private apiUrl = `${environment.apiUrl}/operadoras`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Operadora[]> {
    return this.http.get<Operadora[]>(this.apiUrl);
  }

  criar(op: Partial<Operadora>): Observable<any> {
    return this.http.post(this.apiUrl, op);
  }

  atualizar(id: number, op: Partial<Operadora>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, op);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
