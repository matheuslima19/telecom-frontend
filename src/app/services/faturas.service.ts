import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FaturaService {
  private apiUrl = `${environment.apiUrl}/faturas`;

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  criar(fatura: any): Observable<any> {
    return this.http.post(this.apiUrl, fatura);
  }

  atualizar(id: number, fatura: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, fatura);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
