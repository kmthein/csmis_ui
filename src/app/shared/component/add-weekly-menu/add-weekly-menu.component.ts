import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HolidayService } from '../../../services/admin/holiday.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-weekly-menu',
  templateUrl: './add-weekly-menu.component.html',
  styleUrl: './add-weekly-menu.component.css'
})
export class AddWeeklyMenuComponent {
  today: Date;
  currentMonthDates: Date[] = [];
  publicHolidays: Date[] = [];
  validDays: Date[] = [];

  constructor(private holidayService: HolidayService, private router: Router) {
    this.today = new Date();
  }

  ngOnInit() {
    this.loadPublicHolidays();
  }

  generateNextWeekNonHolidayDates(today: Date): Date[] {
    const nextWeekDates: Date[] = [];
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  
    // Calculate how many days until next Monday
    const daysUntilNextMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday); // Set the date to next Monday
  
    // Generate dates for Monday to Friday
    for (let i = 0; i < 5; i++) { // 5 days (Monday to Friday)
      const date = new Date(nextMonday);
      date.setDate(nextMonday.getDate() + i); // Add i days to next Monday
  
      // Check if this date is not a public holiday
      if (!this.isPublicHoliday(date)) {
        nextWeekDates.push(date);
      }
    }
  
    return nextWeekDates;
  }

  isPublicHoliday(date: Date): boolean {
    return this.publicHolidays.some(holiday => 
      holiday.getDate() === date.getDate() && 
      holiday.getMonth() === date.getMonth() &&
      holiday.getFullYear() === date.getFullYear()
    );
  }

  backToMenuList() {
    this.router.navigate(['/admin/menu']);
  }

  loadPublicHolidays() {
    this.holidayService.getAllHolidays().subscribe({
      next: (data) => {
        this.publicHolidays = data.map((holiday: any) => new Date(holiday.date)); 
        console.log(this.publicHolidays);
        const nextWeek = this.generateNextWeekNonHolidayDates(this.today);
        console.log(nextWeek);
        this.validDays = nextWeek;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

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
  onSubmit(form: NgForm) {
  }
}
