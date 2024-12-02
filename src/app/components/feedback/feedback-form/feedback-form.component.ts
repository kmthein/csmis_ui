import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { LunchService } from '../../../services/lunch.service';
import { Feedback } from '../../../models/feedback';
import { Lunch } from '../../../models/lunch';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { FeedbackResponseService } from '../../../services/feedback-response.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  feedback: Feedback = new Feedback();
  lunch: Lunch | null = null;
  selectedDate: string = '';
  feedbackResponses: any[] = []; // Updated property name

  constructor(
    private feedbackService: FeedbackService,
    private lunchService: LunchService,
    private toastr: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private feedbackResponseService: FeedbackResponseService
  ) {}

  ngOnInit(): void {
    this.loadLunch();
    this.loadFeedbackResponses();
  }

  loadLunch(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedDate =
        params['date'] || new Date().toISOString().split('T')[0];
      this.lunchService.getLunchByDate(this.selectedDate).subscribe(
        (lunch: Lunch) => {
          this.lunch = lunch;
        },
        (error) => {
          this.toastr.error('Error fetching lunch details.', 'Error');
        }
      );
    });
  }

  loadFeedbackResponses(): void {
    this.feedbackResponseService.getAllFeedbackResponses().subscribe(
      (responses) => {
        this.feedbackResponses = responses; // Updated here
      },
      (error) => {
        this.toastr.error('Error fetching feedback responses.', 'Error');
      }
    );
  }

  onSubmit(): void {
    // Ensure required data is set
    this.feedback.userId = this.authService.getUserId();
    this.feedback.lunchId = this.lunch?.id || 0;

    // Check if responseId is provided
    if (!this.feedback.responseId) {
      this.toastr.error('Please select a feedback response.', 'Error');
      return;
    }

    this.feedbackService.createFeedback(this.feedback).subscribe(
      (response) => {
        this.toastr.success('Feedback submitted successfully!', 'Success');
        this.resetForm();
      },
      (error) => {
        this.toastr.error(
          'Error submitting feedback. Please try again.',
          'Error'
        );
      }
    );
  }

  resetForm(): void {
    this.feedback = new Feedback();
  }

  cancel(): void {
    this.resetForm();
  }
}
