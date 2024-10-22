import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lunch } from '../models/lunch';

@Injectable({
  providedIn: 'root'
})
export class LunchService {
  private apiUrl = '/api/lunches'; // Adjust the API endpoint as needed

constructor(private http: HttpClient) {}

getAllLunches(): Observable<Lunch[]> {
  return this.http.get<Lunch[]>(this.apiUrl);
}

createLunch(lunch: Lunch): Observable<Lunch> {
  return this.http.post<Lunch>(this.apiUrl, lunch);
}

updateLunch(id: number, lunch: Lunch): Observable<Lunch> {
  return this.http.put<Lunch>(`${this.apiUrl}/${id}`, lunch);
}

deleteLunch(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}