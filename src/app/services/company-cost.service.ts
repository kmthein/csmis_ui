import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyCostService {
  private baseUrl = 'http://localhost:8080'; // Replace with your actual backend base URL

  constructor(private http: HttpClient) { }

  /**
   * Fetch weekly company costing for the current week
   * @returns Observable of any
   */
  getWeeklyCompanyCosting(): Observable<any> {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of the week (Sunday)
    const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6)); // End of the week (Saturday)

    const params = new HttpParams()
      .set('startDate', startOfWeek.toISOString().split('T')[0])
      .set('endDate', endOfWeek.toISOString().split('T')[0]);

    return this.http.put<any>(`${this.baseUrl}/weekly-company-cost`, {}, { params });
  }

  /**
   * Fetch monthly company costing for the current month
   * @returns Observable of any
   */
  getMonthlyCompanyCosting(): Observable<any> {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are zero-based in JavaScript
    const year = today.getFullYear();

    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());

    return this.http.put<any>(`${this.baseUrl}/monthly-company-cost`, {}, { params });
  }
}
