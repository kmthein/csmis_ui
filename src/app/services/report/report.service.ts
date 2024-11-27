import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getStaffLunchRecord(type: string, timeRange: string, form: FormData) {
    if(type == "Registered Eat") {
      if(timeRange == "daily") {
        return this.http.put(`${this.apiUrl}/registered-ate-daily`, form);
      } else if(timeRange == "custom") {
        return this.http.put(`${this.apiUrl}/registered-ate-weekly`, form);
      } else if(timeRange == "monthly") {
        return this.http.put(`${this.apiUrl}/registered-ate-monthly`, form);
      } else if(timeRange == "yearly") {
        return this.http.put(`${this.apiUrl}/registered-ate-yearly`, form);
      }
    } else if(type == "Registered Not Eat") {
      if(timeRange == "daily") {
        return this.http.put(`${this.apiUrl}/registered-not-eat-daily`, form);
      } else if(timeRange == "custom") {
        return this.http.put(`${this.apiUrl}/registered-not-eat-weekly`, form);
      } else if(timeRange == "monthly") {
        return this.http.put(`${this.apiUrl}/registered-not-eat-monthly`, form);
      } else if(timeRange == "yearly") {
        return this.http.put(`${this.apiUrl}/registered-not-eat-yearly`, form);
      }
    } else if(type == "Unregistered But Eat") {
      if(timeRange == "daily") {
        return this.http.put(`${this.apiUrl}/unregistered-ate-daily`, form);
      } else if(timeRange == "custom") {
        return this.http.put(`${this.apiUrl}/unregistered-ate-weekly`, form);
      } else if(timeRange == "monthly") {
        return this.http.put(`${this.apiUrl}/unregistered-ate-monthly`, form);
      } else if(timeRange == "yearly") {
        return this.http.put(`${this.apiUrl}/unregistered-ate-yearly`, form);
      }
    }
    return null;
  }

  generateReport(
    params: HttpParams
  ): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/generate`, {
      params: params,
      responseType: 'blob', // Expecting a binary file (PDF or Excel)
    });
  }

  getLunchCostBarChart(formData: FormData) {
    return this.http.put(`${this.apiUrl}/lunch-cost`, formData);
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
