import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { LunchService } from '../../../services/lunch.service';
import { Feedback } from '../../../models/feedback';
import { Lunch } from '../../../models/lunch';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  feedback: Feedback = new Feedback();
  lunch: Lunch | null = null; // To hold the fetched lunch data

  constructor(
    private feedbackService: FeedbackService,
    private lunchService: LunchService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTodayLunch();
  }

  // Fetch today's lunch (single lunch object expected)
  loadTodayLunch(): void {
    const today = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
    this.lunchService.getLunchByDate(today).subscribe(
      (lunch: Lunch) => {
        this.lunch = lunch; // Store the fetched lunch
        console.log('Lunch fetched successfully:', this.lunch);
      },
      (error) => {
        console.error('Error fetching lunch:', error);
        this.toastr.error("Error fetching today's lunch. Please try again.", 'Error');
      }
    );
  }

  // Submit feedback form
  onSubmit(): void {
    this.feedback.userId = this.authService.getUserId(); // Set user ID
    if (this.lunch) {
      this.feedback.lunchId = this.lunch.id || 0; // Set lunchId for feedback
    }

    this.feedbackService.createFeedback(this.feedback).subscribe(
      (response) => {
        console.log('Feedback submitted successfully:', response);
        this.toastr.success('Feedback submitted successfully!', 'Success');
        this.resetForm(); // Reset form after submission
      },
      (error) => {
        console.error('Error submitting feedback:', error);
        this.toastr.error('Error submitting feedback. Please try again.', 'Error');
      }
    );
  }

  // Reset the form
  resetForm(): void {
    this.feedback = new Feedback(); // Reset feedback object to clear the form
  }

  // Cancel form and reset
  cancel(): void {
    this.resetForm();
  }
}
