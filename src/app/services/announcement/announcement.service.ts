import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  getUnseenAnnouncementsByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/announcements/unseen/${userId}`);
  }

  getAnnouncementById(id: number) {
    return this.http.get<any>(`${this.url}/announcements/${id}`);
  }

  getAnnouncementAndMakeSeen(id: number, form: FormData) {
    return this.http.put(`${this.url}/announcements/${id}/seen`, form);
  }

  getAllAnnouncements(page: number, size: number): Observable<any> {
    return this.http.get<any>(
      `${this.url}/announcements?page=${page}&size=${size}`
    );
  }

  getAllAnnouncement(): Observable<any> {
    return this.http.get<any>(
      `${this.url}/announcements`
    );
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
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    formData.append('user', `${admin}`);
    formData.append('date', formattedDate);
    return this.http.post<any>(`${this.url}/announcements`, formData).pipe(
      tap((response) => {
        console.log(response);
        if (response.message) {
          this.toast.success(response.message);
        } else if (response.error) {
          this.toast.error(response.error);
        }
      })
    );
  }

  updateAnnouncement(
    id: number,
    title: string,
    content: string,
    files: any,
    adminId: number,
    deleteFileIds: any
  ) {
    const localDate = new Date();
    const formattedDate = localDate.toISOString().split('T')[0];
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('newFiles', files[i]);
      }
    }
    formData.append('adminId', `${adminId}`);
    formData.append('date', formattedDate);
    if (deleteFileIds.length > 0) {
      formData.append('deleteFileIds', deleteFileIds);
    }
    return this.http.put<any>(`${this.url}/announcements/${id}`, formData).pipe(
      tap((response) => {
        if (response.message) {
          this.toast.success(response.message);
        } else if (response.error) {
          this.toast.error(response.error);
        }
      })
    );
  }

  deleteAnnouncement(id: number) {
    return this.http.delete<any>(`${this.url}/announcements/${id}`).pipe(
      tap((response) => {
        if (response.message) {
          this.toast.success(response.message);
        } else if (response.error) {
          this.toast.error(response.error);
        }
      })
    );
  }
}
