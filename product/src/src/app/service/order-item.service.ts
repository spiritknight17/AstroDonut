import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItem } from '../model/orderItem';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private baseUrl = 'http://localhost:8080/api/orderitem';

  constructor(private http: HttpClient) {}

  addOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(this.baseUrl, orderItem);
  }

  addOrderItems(orderItems: OrderItem[]): Observable<OrderItem[]> {
    return this.http.put<OrderItem[]>(`${this.baseUrl}s`, orderItems);
  }

  getAllOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.baseUrl);
  }

  deleteOrderItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  clearOrderItems(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}s`);
  }
}
