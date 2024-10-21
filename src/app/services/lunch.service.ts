import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Import Observablenecessary
import { Lunch } from '../models/lunch';

@Injectable({
  providedIn: 'root'
})
export class LunchService {

  private apiUrl = 'http://localhost:8080/api/lunches'; // Ensure the API URL points to the correct endpoint

  constructor(private http: HttpClient) { }

  register(lunch: Lunch): Observable<any> {
    return this.http.post<any>(this.apiUrl, lunch); // Ensure proper endpoint is called
  }
}
