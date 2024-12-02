import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackResponseService {
  private baseUrl = 'http://localhost:8080/admin/api/feedback-response'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getFeedbackCountByResponseId(responseId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${responseId}`);
  }

  /**
   * Create a new FeedbackResponse
   * @param feedbackResponse The FeedbackResponse object to create
   * @returns Observable of the created FeedbackResponse
   */
  createFeedbackResponse(feedbackResponse: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, feedbackResponse);
  }

  /**
   * Update an existing FeedbackResponse by ID
   * @param id The ID of the FeedbackResponse to update
   * @param feedbackResponse The updated FeedbackResponse data
   * @returns Observable of the updated FeedbackResponse
   */
  updateFeedbackResponse(id: number, feedbackResponse: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, feedbackResponse);
  }

  /**
   * Delete a FeedbackResponse by ID
   * @param id The ID of the FeedbackResponse to delete
   * @returns Observable of void
   */
  deleteFeedbackResponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get all FeedbackResponses
   * @returns Observable of the list of FeedbackResponses
   */
  getAllFeedbackResponses(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  /**
   * Get a FeedbackResponse by ID
   * @param id The ID of the FeedbackResponse
   * @returns Observable of the FeedbackResponse
   */
  getFeedbackResponseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
