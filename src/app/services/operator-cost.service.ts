import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperatorCostService {

  private apiUrl = `http://localhost:8080/api/cost`; // Adjust with your base URL (added 'http://')

  constructor(private http: HttpClient) { }

  // Get weekly total cost for a specific user
  getWeeklyTotalCost(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/weekly/${userId}`);
  }

  // Get monthly total cost for a specific user
  getMonthlyTotalCost(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/monthly/${userId}`);
  }

  // Get yearly total cost for a specific user
  getYearlyTotalCost(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/yearly/${userId}`);
  }
}
