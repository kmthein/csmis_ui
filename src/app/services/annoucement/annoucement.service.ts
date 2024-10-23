import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnoucementService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  getAllAnnouncements(): Observable<any> {
    return this.http.get<any>(`${this.url}/announcements`);
  }

  addNewAnnouncement(
    title: string,
    content: string,
    files: any,
    admin: number
  ) {
    const localDate = new Date();
    const formattedDate = localDate.toISOString().split('T')[0];
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('user', `${admin}`);
    formData.append('date', formattedDate);
    return this.http.post<any>(`${this.url}/announcements`, formData).pipe(
      tap((response) => {
        console.log(response);
        if(response.message) {
          this.toast.success(response.message);
        } else if (response.error) {
          this.toast.error(response.error);
        }
      })
    );
  }
}
