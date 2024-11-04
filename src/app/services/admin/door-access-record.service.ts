import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoorAccessRecordService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}
  
  getAllDoorAccessRecords(): Observable<any> {
    return this.http.get<any>(`${this.url}/doorLogs`);
  }

}
