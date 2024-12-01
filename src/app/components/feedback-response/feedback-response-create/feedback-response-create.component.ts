import { Component, OnInit } from '@angular/core';
import { FeedbackResponse } from '../../../models/feedbackReponse';
import { FeedbackResponseService } from '../../../services/feedback-response.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-feedback-response-create',
  templateUrl: './feedback-response-create.component.html',
  styleUrls: ['./feedback-response-create.component.css']
})
export class FeedbackResponseCreateComponent implements OnInit {
  feedbackResponse: FeedbackResponse = new FeedbackResponse();
  isSubmitting: boolean = false;  // To track submission state
  router: any;

  constructor(
    private feedbackResponseService: FeedbackResponseService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // You can remove any logic for loading responses since we're only handling the create form now
  }

  onSubmit() {
    this.isSubmitting = true;  // Start loading

    this.feedbackResponse.userId = this.authService.getUserId();

    this.feedbackResponseService.createFeedbackResponse(this.feedbackResponse).subscribe(
      response => {
        console.log('Feedback response submitted successfully:', response);
        this.toastr.success('Feedback Option submitted successfully!', 'Success');
        this.resetForm(); // Reset form after submission
        this.isSubmitting = false; // Stop loading
        this.router.navigate(['admin/list-feedback-reponses']);
      },
      error => {
        console.error('Error submitting feedback response:', error);
        this.toastr.error('Error submitting response. Please try again.', 'Error');
        this.isSubmitting = false; // Stop loading
      }
    );
  }

  resetForm() {
    this.feedbackResponse = new FeedbackResponse(); // Reset feedbackResponse object
  }

  cancel() {
    this.resetForm();  // Clear form data
  }
}
