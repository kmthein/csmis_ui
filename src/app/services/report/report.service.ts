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
    templatePath: any,
    fileType: any,
    fileName: any
  ): Observable<Blob> {
    const params = new HttpParams()
      .set('templatePath', templatePath)
      .set('fileType', fileType)
      .set('fileName', fileName);

    return this.http.get(`${this.apiUrl}/generate`, {
      params: params,
      responseType: 'blob', // Expecting a binary file (PDF or Excel)
    });
  }

  getLunchSummaryPie() {
    const formData = new FormData();
    formData.append("date", "2024-11-12");
    return this.http.put(`${this.apiUrl}/lunch-summary`, formData);
  }

  getMonthlySummaryPie() {
    return this.http.get(`${this.apiUrl}/monthly-summary`);
  }

  getMailOnUsers() {
    return this.http.get(`${this.apiUrl}/mail-on`);
  }
}
