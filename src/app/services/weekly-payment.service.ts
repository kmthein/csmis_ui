import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeeklyPaymentDTO } from '../DTO/WeeklyPaymentDTO';

@Injectable({
  providedIn: 'root'
})
export class WeeklyPaymentService {
  private apiUrl = 'http://localhost:8080/admin/api'; 

  constructor(private http :HttpClient) {}
  getTotalCostAndDateCount(departmentId: number | null = null): Observable<any> {
    const params: any = {};
    if (departmentId !== null) {
      params.departmentId = departmentId;
    }
    return this.http.get<any>(`${this.apiUrl}/total-cost-and-date-count`, { params });
  }
  
  getTotalCostAndDateCountForMonth(month: number, year: number, departmentId?: number): Observable<any> {
    let params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());

    if (departmentId) {
      params = params.set('departmentId', departmentId.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/total-cost-and-month-count/${month}/${year}`, { params });
  }
  getTotalCostAndDateCountForYear(year: number, departmentId?: number): Observable<any> {
    let params = new HttpParams().set('year', year.toString());
  
    if (departmentId) {
      params = params.set('departmentId', departmentId.toString());
    }
  
    return this.http.get<any>(`${this.apiUrl}/total-cost-and-year-count/${year}`, { params });
  }

  //Admin

  getCompanyCostWeekly(departmentId: number | null): Observable<any> {
    let url = `${this.apiUrl}/total-company-cost`; 
    if (departmentId !== null) {
      url += `&departmentId=${departmentId}`;
    }

    return this.http.get<any>(url);  
  }
  getCompanyCost(month: number, year: number, departmentId: number | null): Observable<any> {
    let url = `${this.apiUrl}/total-company-cost-and-month-count/${month}/${year}`;
    if (departmentId) {
      url += `?departmentId=${departmentId}`;
    }
    return this.http.get<any>(url);
  }
  getCompanyCostForYear(year: number, departmentId: number | null): Observable<any> {
    let url = `${this.apiUrl}/total-company-cost-and-year-count/${year}`;
    if (departmentId) {
      url += `?departmentId=${departmentId}`;
    }
    return this.http.get<any>(url);
  }

  //TotalCost

  getAllTotalCostAndDateCount(departmentId?: number): Observable<any> {
    let params = new HttpParams();
    if (departmentId) {
      params = params.set('departmentId', departmentId.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/all-total-cost-and-date-count`, { params });
  }
  getAllTotalCostAndDateCountForYear(year: number, departmentId?: number): Observable<any> {
    let params = new HttpParams();
    if (departmentId) {
      params = params.set('departmentId', departmentId.toString());
    }

    return this.http.get(`${this.apiUrl}/all-total-cost-and-year-count/${year}`, { params });
  }
  getAllTotalCostAndDateCountForMonth(
    month: number,
    year: number,
    departmentId?: number
  ): Observable<any> {
    let url = `${this.apiUrl}/all-total-cost-and-date-count/${month}/${year}`;
    if (departmentId != null) {
      url += `?departmentId=${departmentId}`;
    }
    return this.http.get<any>(url);
  }
}
