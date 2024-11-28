import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../services/suggestion.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-suggestion-create',
  templateUrl: './suggestion-create.component.html',
  styleUrls: ['./suggestion-create.component.css']
})
export class SuggestionCreateComponent {
  suggestion: Suggestion = new Suggestion();

  constructor(
    private suggestionService: SuggestionService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.suggestion.userId = this.authService.getUserId(); // Set user ID

    this.suggestionService.createSuggestion(this.suggestion).subscribe(
      response => {
        console.log('Suggestion submitted successfully:', response);
        this.toastr.success('Suggestion submitted successfully!', 'Success');
        this.resetForm(); // Reset form after submission
      },
      error => {
        console.error('Error submitting suggestion:', error);
        this.toastr.error('Error submitting suggestion. Please try again.', 'Error');
      }
    );
  }

  resetForm() {
    this.suggestion = new Suggestion(); // Reset suggestion object to clear the form
  }

  cancel() {
    this.resetForm();
  }
}
