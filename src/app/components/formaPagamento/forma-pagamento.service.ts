import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { FormaPagamento } from './formaPagamento.model';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  baseUrl: string = "http://localhost:8080/formapagamento";
  
  // Subject para emitir eventos de mudança no contador
  private contadorSubject = new Subject<'increment' | 'decrement'>();
  contador$ = this.contadorSubject.asObservable();

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    return new Observable(observer => {
      this.http.post<FormaPagamento>(this.baseUrl, formaPagamento).subscribe({
        next: (result) => {
          this.contadorSubject.next('increment');
          observer.next(result);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  read(): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(this.baseUrl);
  }

  readById(fId: number): Observable<FormaPagamento> {
    const url = `${this.baseUrl}/${fId}`;
    return this.http.get<FormaPagamento>(url);
  }

  update(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    const url = `${this.baseUrl}/${formaPagamento.fId}`;
    return this.http.put<FormaPagamento>(url, formaPagamento);
  }

  delete(fId: number): Observable<FormaPagamento> {
    const url = `${this.baseUrl}/${fId}`;
    return new Observable(observer => {
      this.http.delete<FormaPagamento>(url).subscribe({
        next: (result) => {
          this.contadorSubject.next('decrement');
          observer.next(result);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }
}
