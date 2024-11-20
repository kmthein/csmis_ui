import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Lunch } from '../models/lunch';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LunchService {
  private apiUrl = 'http://localhost:8080/api/lunches'; // Adjust this to your API endpoint

  constructor(private http: HttpClient, private toast: ToastrService) {}


  addWeeklyLunch(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/weekly`, formData);
  }

  getWeeklyLunch() {
    return this.http.get<any>(`${this.apiUrl}/weekly`);
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
  createLunch(lunch: any): Observable<Lunch> {
    return this.http.post<Lunch>(this.apiUrl, lunch).pipe(
      tap((response: any) => {
        if(response?.message) {
          this.toast.success(response.message);
        } else {
          this.toast.error(response?.message);
        }
      })
    );
  }

  // Update an existing lunch
  updateLunch(id: number, lunch: any): Observable<Lunch> {
    return this.http.put<Lunch>(`${this.apiUrl}/${id}`, lunch).pipe(
      tap((response: any) => {
        console.log(response);
        if(response?.message) {
          this.toast.success(response.message);
        } else {
          this.toast.error(response?.message);
        }
      })
    );;
  }

  // Delete a lunch by ID
  deleteLunch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLunchByDate(date: string): Observable<Lunch> {
    const params = new HttpParams().set('date', date);
    return this.http.get<Lunch>(`${this.apiUrl}/date`, { params }).pipe(
      tap({
        next: (response) => {
          // Log the backend response to the console
          console.log('Lunch data:', response);
        },
        error: () => {
          // Log the error to the console if the request fails
          console.error(`Failed to load lunch for ${date}`);
        },
      })
    );
  }


  
}
