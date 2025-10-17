import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Contato } from './contato.mode';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  baseUrl: string = "http://localhost:8080/contato";  // URL base para a API de Contato

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  // Método para exibir mensagens de feedback
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,  // Duração da mensagem em milissegundos
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  // Cria um novo Contato
  create(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.baseUrl, contato);
  }

  // Lê todos os Contatos
  read(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.baseUrl);
  }

  // Lê um Contato por ID
  readById(id: number): Observable<Contato> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Contato>(url);
  }

  // Atualiza um Contato
  update(contato: Contato): Observable<Contato> {
    const url = `${this.baseUrl}/${contato.conId}`;  // Usando conId como o campo de ID
    return this.http.put<Contato>(url, contato);
  }

  // Deleta um Contato por ID
  delete(id: number): Observable<Contato> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Contato>(url);
  }
}