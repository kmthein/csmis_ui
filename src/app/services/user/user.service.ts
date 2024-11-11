import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { DietaryPreference } from '../../models/DietaryPreference';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  [x: string]: any;
  private url = 'http://localhost:8080/admin/api';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  addStaff(data: any) {
    return this.http.post<any>(`${this.url}/users`, data).pipe(
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

  updateStaff(data: any, id: number) {
    return this.http.put<any>(`${this.url}/users/${id}`, data).pipe(
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

  getAllStaffs(): Observable<any> {
    return this.http.get<any>(`${this.url}/users`);
  }

  getStaffById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/users/${id}`);
  }
  saveDietaryPreference(preference: DietaryPreference) {
    return this.http.post('http://localhost:8080/admin/api/users/saveDietaryPreference', preference, { responseType: 'text' });
}

}
