import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:8080/api/feedbacks';  // Your backend API endpoint for feedbacks

  constructor(private http: HttpClient) { }

  getFeedbackCountForCurrentWeek(responseId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/week/${responseId}`);
  }

  // Get feedback count for the current month
  getFeedbackCountForCurrentMonth(responseId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/month/${responseId}`);
  }

  getFeedbackCountByResponseId(responseId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/${responseId}`);
  }

  getFeedbackByUserAndDate(userId: number, date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/for-update?userId=${userId}&date=${date}`);
  }

  checkFeedbackStatus(userId: number, lunchId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/has-feedback`, {
      params: { userId: userId.toString(), lunchId: lunchId.toString() },
    });
  }

  // Get all feedbacks
  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  // Get feedback by ID
  getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${id}`);
  }

  // Create a new feedback
  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback);
  }

  // Update an existing feedback
  updateFeedback(id: number, feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${id}`, feedback);
  }

  // Delete feedback (logical delete)
  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
