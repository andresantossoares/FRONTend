import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Fornecedor } from './fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  baseUrl: string = "http://localhost:8080/fornecedores";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.baseUrl, fornecedor);
  }

  read(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.baseUrl);
  }

  readById(fId: string): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${fId}`;
    return this.http.get<Fornecedor>(url);
  }

  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${fornecedor.fId}`;
    return this.http.put<Fornecedor>(url, fornecedor);
  }

  delete(fId: number): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${fId}`;
    return this.http.delete<Fornecedor>(url);
  }
  
}
