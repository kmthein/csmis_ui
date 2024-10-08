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
    const formData = new FormData();
    formData.append("file", data);  
    formData.append("adminId", adminId.toString());  
    return this.http
      .post<any>(`${this.url}/users`, formData)
      .pipe(
        tap((response) => {
          console.log(response);
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
}
