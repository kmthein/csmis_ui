import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllStaffs(): Observable<any> {
    return this.http.get<any>(`${this.url}/users`);
  }
}
