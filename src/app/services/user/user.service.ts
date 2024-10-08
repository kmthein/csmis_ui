import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  importFromExcel(data: File, adminId: number) {
    console.log(data);
    return this.http
      .post<any>(`${this.url}/users`, { file: data, adminId })
      .pipe(
        tap((response) => {
          console.log(response);
          // this.toastService.setMessage(response.message, 'toast-success');
        }),
        catchError((err) => {
          const { error } = err;
          // this.toastService.setMessage(error.message, 'toast-danger');
          return throwError(error);
        })
      );
  }

  getAllStaffs(): Observable<any> {
    return this.http.get<any>(`${this.url}/users`);
  }
}
