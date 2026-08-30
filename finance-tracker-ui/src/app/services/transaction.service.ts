import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/transactions';

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  create(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  update(id: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${id}`, transaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
