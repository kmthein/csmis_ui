import { Component, OnInit } from '@angular/core';
import { LunchRegistrationService } from '../../services/lunch-registration.service';
import { LunchRegistrationDTO } from '../../DTO/LunchRegistrationDTO';

@Component({
  selector: 'app-lunch-registration',
  templateUrl: './lunch-registration.component.html',
  styleUrls: ['./lunch-registration.component.css']
})
export class LunchRegistrationComponent implements OnInit {
  currentMonth: Date = new Date();
  selectedDates: Date[] = [];
  currentMonthDates: Date[] = [];
  today: Date;
  userId: number | null = null;
  isFirstRegistration: boolean = true; // Flag to check if it's the first registration

  constructor(private lunchRegistrationService: LunchRegistrationService) {
    this.today = new Date();
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.id) {
      this.userId = user.id;
      this.loadUserSelectedDates();
    } else {
      console.error('User not found in local storage!');
    }
  }

  // Load user selected dates from the backend
  loadUserSelectedDates(): void {
    if (this.userId) {
      this.lunchRegistrationService.getSelectedDates(this.userId).subscribe(
        (registeredDates: Date[]) => {
          // Map the received date strings to Date objects 
          this.selectedDates = registeredDates.map(dateStr => new Date(dateStr));
          this.generateCalendarDates(this.currentMonth); // Generate calendar after loading dates
          
          // Check if user has already registered
          this.isFirstRegistration = this.selectedDates.length === 0; // Set to false if there are already selected dates

          // Populate weekdays excluding the current week if no dates are selected
          if (this.selectedDates.length === 0) {
            this.populateAllWeekdaysExcludingCurrentWeek(this.currentMonth);
          }
        },
        error => {
          console.error('Error loading selected dates:', error);
          this.populateAllWeekdaysExcludingCurrentWeek(this.currentMonth); // Fallback to populating weekdays excluding current week
        }
      );
    }
  }

  // Populate all weekdays of the current month, excluding the current week
  populateAllWeekdaysExcludingCurrentWeek(month: Date): void {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    // Clear the selectedDates array before populating
    this.selectedDates = [];
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset the time to midnight for comparison

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      
      // Skip if the date is a weekday within the current week
      if (!this.isCurrentWeek(date) && date.getDay() !== 0 && date.getDay() !== 6 && date > today) {
        this.selectedDates.push(date);
      }
    }
  }

  // Check if a date is before or today
  isBeforeOrToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() <= today.getTime();
  }

  // Check if a date is a weekend
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday (0) and Saturday (6)
  }

  // Check if a date is within the current week
  isCurrentWeek(date: Date): boolean {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday of the current week
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));   // Sunday of the current week

    return date >= startOfWeek && date <= endOfWeek;
  }

  // Toggle the selection of a date
  toggleDate(date: Date): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's time to midnight for comparison

    // Check if the date is before or today, a weekend, or within the current week
    if (!this.isBeforeOrToday(date) && !this.isWeekend(date) && !this.isCurrentWeek(date)) {
      const index = this.selectedDates.findIndex(selectedDate => selectedDate.getTime() === date.getTime());
      if (index === -1) {
        this.selectedDates.push(date); // Select the date
      } else {
        this.selectedDates.splice(index, 1); // Unselect the date
      }
    }
  }

  // Check if a date is selected
  isDateSelected(date: Date): boolean {
    return this.selectedDates.some(selectedDate => selectedDate.getTime() === date.getTime());
  }

  // Generate the dates for the current month calendar
  generateCalendarDates(month: Date): void {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    this.currentMonthDates = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      this.currentMonthDates.push(date);
    }
  }

  // Get empty days before the first day of the current month
  getEmptyDaysBefore(month: Date): Date[] {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const emptyDays = [];
    const dayOfWeek = firstDay.getDay();

    // Calculate the number of empty days to display at the start of the calendar
    for (let i = 0; i < dayOfWeek; i++) {
      // Push empty Date objects to the array
      emptyDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), i - dayOfWeek + 1));
    }
    return emptyDays;
  }

  // Navigate to the previous month
  goToPreviousMonth(): void {
    if (!this.isFirstMonth()) {
      const prevMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
      this.currentMonth = prevMonth;
      this.generateCalendarDates(this.currentMonth);
    }
  }

  // Navigate to the next month
  goToNextMonth(): void {
    if (this.isLastWeekOfMonth()) {
      const nextMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
      this.currentMonth = nextMonth;
      this.generateCalendarDates(this.currentMonth);
    }
  }

  // Check if the current date is in the last week of the month
  isLastWeekOfMonth(): boolean {
    const today = new Date();
    const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0).getDate();
    return today.getDate() >= lastDay - 6; 
  }

  // Check if the current month is the first month of the year
  isFirstMonth(): boolean {
    return this.currentMonth.getFullYear() === this.today.getFullYear() &&
           this.currentMonth.getMonth() === this.today.getMonth();
  }

  // Submit registration for lunch
  submitRegistration(): void {
    if (this.userId) {
      const registrationDto: LunchRegistrationDTO = {
        userId: this.userId,
        selectedDates: this.selectedDates.map(date => date.toISOString()) // Format dates as ISO strings
      };

      if (this.isFirstRegistration) {
        this.lunchRegistrationService.registerUserForLunch(registrationDto).subscribe(
          response => {
            console.log('Registration successful:', response);
            this.isFirstRegistration = false; 
          },
          error => {
            console.error('Error registering for lunch:', error);
          }
        );
      } else {
        this.lunchRegistrationService.updateLunchRegistration(this.userId, registrationDto).subscribe(
          response => {
            console.log('Registration updated successfully:', response);
          },
          error => {
            console.error('Error updating registration:', error);
          }
        );
      }
    } else {
      console.error('User ID is not set!');
    }
  }
}
