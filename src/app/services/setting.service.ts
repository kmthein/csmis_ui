import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private apiUrl = 'http://localhost:8080/api/settings';

  constructor(private http: HttpClient) {}

  getSettings() {
    return this.http.get(`${this.apiUrl}`);
  }

  updateSettings(form: FormData) {
    return this.http.put<any>(`${this.apiUrl}`, form);
  }

  updateLastRegister(form: FormData) {
    return this.http.put(`${this.apiUrl}/last-register`, form);
  }
}
