import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api';

  private userSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private toast: ToastrService) {
    const storedUser = localStorage.getItem("user");
    if(storedUser) {
      this.userSource.next(JSON.parse(storedUser));
    }
  }

  login(staffId: string, password: string): Observable<any> {
    const body = { staffId, password };
    return this.http.post<any>(`${this.url}/login`, body).pipe(
      tap((response) => {
        console.log(response);
        const { token, userDetails } = response;
        if(token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userDetails));
          this.userSource.next(userDetails);
          this.toast.success('Login Success');
        } else {
          this.toast.error(response?.message || 'Login failed');
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSource.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}