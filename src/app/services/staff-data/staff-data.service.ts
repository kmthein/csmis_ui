import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffDataService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  getAllDivision(): Observable<any> {
    return this.http.get<any>(`${this.url}/divisions`);
  }
  getAllDepartment(): Observable<any> {
    return this.http.get<any>(`${this.url}/departments`);
  }
  getAllTeam(): Observable<any> {
    return this.http.get<any>(`${this.url}/teams`);
  }
}
