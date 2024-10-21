import { Component } from '@angular/core';
import { Lunch } from '../../../models/lunch';

@Component({
  selector: 'app-admin-lunch',
  templateUrl: './admin-lunch.component.html',
  styleUrl: './admin-lunch.component.css'
})
export class AdminLunchComponent {
  isModalOpen = false;
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  lunch: Lunch = {
    menu: [], // Initialize with five empty strings
    price: '',
    companyRate: '',
    date: new Date(),
  };
  startDate: string | null = null;
  endDate: string | null = null;

  onStartDateChange(event: any) {
    this.startDate = event.target.value;
    this.calculateEndDate();
  }
  onEndDateChange(event: any) {
    const selectedEndDate = new Date(event.target.value);
    const selectedStartDate = new Date(this.startDate!);
  
    if (selectedEndDate < selectedStartDate) {
      // Show an error message or reset the end date
      alert('End date must be after the start date');
      this.endDate = null; // Reset the end date
    } else {
      this.endDate = selectedEndDate.toISOString().split('T')[0]; // Update the end date
    }
  }

  calculateEndDate() {
    if (this.startDate) {
      const start = new Date(this.startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + 6); // Set end date to one week later
      this.endDate = end.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted', this.lunch);
      // Call your service to submit this.lunch
    }
  }
}




