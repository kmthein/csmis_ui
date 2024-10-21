import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  importFromExcel(data: File, adminId: number, endpoint: string) {
    const formData = new FormData();
    formData.append('file', data);
    formData.append('adminId', adminId.toString());
    return this.http.post<any>(`${this.url}/${endpoint}/excel`, formData).pipe(
      tap((response) => {
        console.log(response);
        if (response.message) {
          this.toast.success(response.message);
        } else if (response.error) {
          this.toast.error(response.error);
        }
      }),
      catchError((err) => {
        const { error } = err;
        return throwError(error);
      })
    );
  }
}
