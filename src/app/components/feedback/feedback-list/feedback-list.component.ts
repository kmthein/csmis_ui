import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback } from '../../../models/feedback';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css'],
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  paginatedFeedbacks: Feedback[] = [];
  searchQuery: string = '';
  startDate: string | null = null;
  endDate: string | null = null;

  // Pagination variables
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        // Sort the feedbacks by date in descending order
        this.feedbacks = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // Initialize filteredFeedbacks and pagination
        this.filteredFeedbacks = this.feedbacks;
        this.totalPages = Math.ceil(this.filteredFeedbacks.length / this.pageSize);
        this.updatePaginatedData();
      },
      error: (err) => {
        console.error('Error fetching feedbacks:', err);
      },
    });
  }
  

  searchFeedbacks(): void {
    // Filter by search query and date range
    this.filteredFeedbacks = this.feedbacks.filter((feedback) => {
      const isSearchMatch =
        (feedback.comment?.toLowerCase().includes(this.searchQuery.toLowerCase()) || '') ||
        (feedback.userName?.toLowerCase().includes(this.searchQuery.toLowerCase()) || '') ||
        (feedback.lunchMenu?.toLowerCase().includes(this.searchQuery.toLowerCase()) || '') ||
        (feedback.response?.toLowerCase().includes(this.searchQuery.toLowerCase()) || ''); // Include response in search
  
      const isDateInRange =
        (this.startDate ? new Date(feedback.date) >= new Date(this.startDate) : true) &&
        (this.endDate ? new Date(feedback.date) <= new Date(this.endDate) : true);
  
      return isSearchMatch && isDateInRange;
    });
  
    this.totalPages = Math.ceil(this.filteredFeedbacks.length / this.pageSize);
    this.currentPage = 1; // Reset to first page after search
    this.updatePaginatedData();
  }
  

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    this.paginatedFeedbacks = this.filteredFeedbacks.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }
}
