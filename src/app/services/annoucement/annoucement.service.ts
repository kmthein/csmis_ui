import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnoucementService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  addNewAnnouncement(
    title: string,
    content: string,
    file: File,
    admin: number
  ) {
    const localDate = new Date();
    const formattedDate = localDate.toISOString().split('T')[0];
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('files', file);
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
