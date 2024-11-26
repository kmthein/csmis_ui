import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminActionService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  deleteByType(type: string, id: number) {
    if(type == "holiday") {
      this.url = 'http://localhost:8080/admin/api';
    } else if(type == "menu") {
      type = "lunches";
    } else if(type == "restaurant") {
      type = "restaurants";
    }
    return this.http.delete<any>(`${this.url}/${type}/${id}`);
  }
}
