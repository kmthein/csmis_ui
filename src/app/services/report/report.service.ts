import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  generateReport(
    params: HttpParams
  ): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/generate`, {
      params: params,
      responseType: 'blob', // Expecting a binary file (PDF or Excel)
    });
  }

  getLunchSummaryPie(date: string) {
    const formData = new FormData();
    formData.append("date", date);
    return this.http.put(`${this.apiUrl}/lunch-summary`, formData);
  }
  
  getLunchSummaryBetween(form: FormData) {
    return this.http.put(`${this.apiUrl}/summary-between`, form);
  }

  getMonthlySummaryPie(form: FormData) {
    return this.http.put(`${this.apiUrl}/monthly-summary`, form);
  }
  
  getYearlySummaryPie(form: FormData) {
    return this.http.put(`${this.apiUrl}/yearly-summary`, form);
  }

  getMailOnUsers() {
    return this.http.get(`${this.apiUrl}/mail-on`);
  }
}
