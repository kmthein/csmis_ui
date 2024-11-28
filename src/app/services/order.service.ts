import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `http://localhost:8080/api/orders`; // Base URL for the orders endpoint

  constructor(private http: HttpClient) {}

  getQuantity(date: string): Observable<number> {
    const params = { date }; // Assuming 'date' is passed as a query parameter
    return this.http.get<number>(`${this.apiUrl}/quantity`, { params });
  }

  getNextWeekRegister() {
    return this.http.get(`http://localhost:8080/api/lunch/lunch-count-next-week`);
  }

  // Create a new order
  createOrder(order: any): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}`, order);
  }

  // Get an order by ID
  getOrderById(id: number): Observable<Order> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Update an existing order
  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, order);
  }

  // Delete an order
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
