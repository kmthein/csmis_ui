import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  addRestaurant(data: any) {
    return this.http.post<any>(`${this.url}/restaurants`, data).pipe(
      tap((response) => {
        console.log(response);
        
        this.toast.success('Restaurant added successfully!');
      }),
      catchError((err) => {
        this.toast.error('Error occurred while adding restaurant!');
        return throwError(err);
      })
    );
  }
  

  updateRestaurants(data: any, id: number) {
    return this.http.put<any>(`${this.url}/restaurants/${id}`, data).pipe(
      tap((response) => {
        if (response.status == '200') {
          this.toast.success(response.message);
        } else {
          this.toast.error(response.message);
        }
      }),
      catchError((err) => {
        const { error } = err;
        return throwError(error);
      })
    );
  }

  getAllRestaurants(): Observable<any> {
    return this.http.get<any>(`${this.url}/restaurants`);
  }

  getRestaurantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/restaurants/${id}`);
  }
}
