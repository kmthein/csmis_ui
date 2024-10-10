import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllHolidays(): Observable<any> {
    return this.http.get<any>(`${this.url}/holidays`);
  }
}
