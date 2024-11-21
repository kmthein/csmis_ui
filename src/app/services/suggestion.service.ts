import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  private baseUrl = 'http://localhost:8080/api/suggestions';

  constructor(private http: HttpClient) {}

  getUnseenSuggestionsByUserId(userId: number): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(`${this.baseUrl}/unseen/${userId}`);
  }

  getSuggestionAndMakeSeen(id: number, form: FormData) {
    return this.http.put(`${this.baseUrl}/${id}/seen`, form);
  }

  // Get all suggestions (Admin only)
  getAllSuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(`${this.baseUrl}`);
  }

  // Get suggestion by ID (Admin only)
  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.baseUrl}/${id}`);
  }

  // Create a new suggestion (Operator only)
  createSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(`${this.baseUrl}`, suggestion);
  }

  // Update an existing suggestion (Operator only)
  updateSuggestion(id: number, suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.baseUrl}/${id}`, suggestion);
  }

  // Delete a suggestion (Admin only)
  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
