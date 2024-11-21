import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LunchRegistrationDTO } from '../DTO/LunchRegistrationDTO';

@Injectable({
  providedIn: 'root'
})
export class LunchRegistrationService {
  private apiUrl = 'http://localhost:8080/api/lunch'; // Adjust this if your backend URL changes

  constructor(private http: HttpClient) {}

  registerUserForLunch(registrationDto: LunchRegistrationDTO): Observable<string> {
    return this.http.post('http://localhost:8080/api/lunch', registrationDto, { responseType: 'text' });
  }
   
  updateUserLunchRegistration(userId: number, registrationDto: LunchRegistrationDTO): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${userId}`, registrationDto, { responseType: 'text' as 'json' });
}
getSelectedDates(userId: number): Observable<Date[]> {
  return this.http.get<Date[]>(`${this.apiUrl}/selected-dates/${userId}`);
}
deleteUserSelectedDate(userId: number, date: Date): Observable<any> {
  return this.http.delete(`${this.apiUrl}/lunch/unregister`, {
    body: { userId, date: date.toISOString() }
  });
}
updateLunchRegistration(userId: number, registrationDto: LunchRegistrationDTO): Observable<any> {
  return this.http.put(`${this.apiUrl}/${userId}`, registrationDto);
}
updateLunchRegistrationForNextMonth(userId: number, registrationDto: LunchRegistrationDTO): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/api/lunch/update-next-month/${userId}`, registrationDto);
}
getLunchDetails(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/get-lunch-details/${userId}`);
}
saveUserCost(userHasLunch: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/saveUserCosts`, userHasLunch);
}
}
