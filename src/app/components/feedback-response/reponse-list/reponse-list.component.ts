import { Component, OnInit } from '@angular/core';
import { FeedbackResponse } from '../../../models/feedbackReponse';
import { FeedbackResponseService } from '../../../services/feedback-response.service';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-reponse-list',
  templateUrl: './reponse-list.component.html',
  styleUrls: ['./reponse-list.component.css']
})
export class ReponseListComponent implements OnInit {
  feedbackResponses: FeedbackResponse[] = [];  // To hold list of feedback responses
  isDeleteConfirmationVisible: boolean = false; // To control the visibility of delete confirmation dialog
  responseToDelete: FeedbackResponse | null = null; // Store the response to delete
  feedbackCounts: { [key: number]: number } = {};  // To store feedback count for each response

  constructor(
    private feedbackResponseService: FeedbackResponseService,
    private feedbackService: FeedbackService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadFeedbackResponses(); // Load feedback responses when the component initializes
  }

  // Fetch the list of feedback responses
  loadFeedbackResponses() {
    this.feedbackResponseService.getAllFeedbackResponses().subscribe(
      responses => {
        this.feedbackResponses = responses;
        // After fetching responses, get the feedback count for each response
        this.feedbackResponses.forEach(response => {
          this.getFeedbackCount(response.id);
        });
      },
      error => {
        console.error('Error fetching feedback responses:', error);
        this.toastr.error('Error loading feedback responses', 'Error');
      }
    );
  }

  // Get the count of feedbacks for each response
  getFeedbackCount(responseId: number) {
    this.feedbackService.getFeedbackCountByResponseId(responseId).subscribe(
      count => {
        this.feedbackCounts[responseId] = count;  // Store the count in the dictionary
      },
      error => {
        console.error('Error fetching feedback count:', error);
        this.toastr.error('Error fetching feedback count', 'Error');
      }
    );
  }

  // Show confirmation dialog when delete is clicked
  showDeleteConfirmation(response: FeedbackResponse) {
    this.isDeleteConfirmationVisible = true;
    this.responseToDelete = response;
  }

  // Delete the selected feedback response
  deleteFeedbackResponse() {
    if (this.responseToDelete) {
      this.feedbackResponseService.deleteFeedbackResponse(this.responseToDelete.id).subscribe(
        () => {
          this.toastr.success('Feedback response deleted successfully!', 'Success');
          this.loadFeedbackResponses(); // Refresh the list after deletion
          this.isDeleteConfirmationVisible = false; // Hide confirmation dialog
        },
        error => {
          console.error('Error deleting feedback response:', error);
          this.toastr.error('Error deleting response. Please try again.', 'Error');
          this.isDeleteConfirmationVisible = false; // Hide confirmation dialog
        }
      );
    }
  }

  // Hide the delete confirmation dialog without deleting
  cancelDelete() {
    this.isDeleteConfirmationVisible = false; // Hide confirmation dialog
  }
}
