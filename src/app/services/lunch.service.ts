import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lunch } from '../models/lunch';

@Injectable({
  providedIn: 'root',
})
export class LunchService {
  private apiUrl = 'http://localhost:8080/api/lunches'; // Adjust this to your API endpoint

  constructor(private http: HttpClient) {}

  addWeeklyLunch(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/weekly`, formData);
  }

  // Get all lunches
  getAllLunches(): Observable<Lunch[]> {
    return this.http.get<Lunch[]>(this.apiUrl);
  }

  // Get a specific lunch by ID
  getLunchById(id: number): Observable<Lunch> {
    return this.http.get<Lunch>(`${this.apiUrl}/${id}`);
  }

  // Create a new lunch
  createLunch(lunch: Lunch): Observable<Lunch> {
    return this.http.post<Lunch>(this.apiUrl, lunch);
  }

  // Update an existing lunch
  updateLunch(id: number, lunch: Lunch): Observable<Lunch> {
    return this.http.put<Lunch>(`${this.apiUrl}/${id}`, lunch);
  }

  // Delete a lunch by ID
  deleteLunch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
