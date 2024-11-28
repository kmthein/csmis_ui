import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentVoucher } from '../models/paymentVoucher';

@Injectable({
  providedIn: 'root',
})
export class PaymentVoucherService {
  private apiUrl = 'http://localhost:8080/api/payment-vouchers';

  constructor(private http: HttpClient) {}

  // Get all payment vouchers
  getPaymentVouchers(): Observable<PaymentVoucher[]> {
    return this.http.get<PaymentVoucher[]>(this.apiUrl);
  }

  // Get a single payment voucher by ID
  getPaymentVoucher(id: number): Observable<PaymentVoucher> {
    return this.http.get<PaymentVoucher>(`${this.apiUrl}/${id}`);
  }

  

  // Create multiple payment vouchers
  createPaymentVoucher(paymentVouchers: PaymentVoucher): Observable<PaymentVoucher> {
    return this.http.post<PaymentVoucher>(this.apiUrl, paymentVouchers); // Send an array to the backend
  }

  // Update an existing payment voucher
  updatePaymentVoucher(id: number, paymentVoucher: PaymentVoucher): Observable<PaymentVoucher> {
    return this.http.put<PaymentVoucher>(`${this.apiUrl}/${id}`, paymentVoucher);
  }

  // Delete a payment voucher by ID
  deletePaymentVoucher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getQuantity(date: string): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/api/orders/quantity`, { params: { date } });
  }

  getTotalCost(date: string): Observable<number> {
    const params = new HttpParams().set('date', date);
    return this.http.get<number>(`http://localhost:8080/api/lunches/cost`,{ params: { date } });
  }
  
}
