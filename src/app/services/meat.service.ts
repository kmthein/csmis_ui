import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Meat } from '../models/meat';

@Injectable({
  providedIn: 'root'
})
export class MeatService {
  private apiUrl = 'http://localhost:8080/api/meat';

  constructor(private http: HttpClient) { }

  getAllMeats(): Observable<Meat[]> {
    return this.http.get<Meat[]>(this.apiUrl);
  }

  getMeatById(id: number): Observable<Meat> {
    return this.http.get<Meat>(`${this.apiUrl}/${id}`);
  }

  createMeat(meat: Meat): Observable<Meat> {
    return this.http.post<Meat>(this.apiUrl, meat).pipe(
      catchError((error) => {
        if (error.status === 409) {
          alert('A meat with this name already exists.');
        }
        return throwError(() => error);
      })
    );
  }

  updateMeat(id: number, meat: Meat): Observable<Meat> {
    return this.http.put<Meat>(`${this.apiUrl}/${id}`, meat).pipe(
      catchError((error) => {
        if (error.status === 409) {
          alert('A meat with this name already exists.');
        }
        return throwError(() => error);
      })
    );
  
  }

  deleteMeat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
