import { Component, OnInit } from '@angular/core';
import { LunchRegistrationService } from '../../services/lunch-registration.service';
import { LunchRegistrationDTO } from '../../DTO/LunchRegistrationDTO';
import { HolidayService } from '../../services/admin/holiday.service';
import { error } from 'jquery';
import { Meat } from '../../models/meat';
import { MeatService } from '../../services/meat.service';
import { DietaryPreference } from '../../models/DietaryPreference';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-lunch-registration',
  templateUrl: './lunch-registration.component.html',
  styleUrls: ['./lunch-registration.component.css']
})
export class LunchRegistrationComponent implements OnInit {
  currentMonth: Date = new Date();
  selectedDates: Date[] = [];
  currentMonthDates: Date[] = [];
  publicHolidays: Date[] = [];
  today: Date;
  userId: number | null = null;
  isFirstRegistration: boolean = true; 
  meats: Meat[] = [];
  showVeganModal = false;
  showMeatModal = false;
  selectedMeats: number[] = [];

  constructor(private lunchRegistrationService: LunchRegistrationService,private meatService: MeatService,private userService: UserService, private holidayService: HolidayService) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.loadPublicHolidays();
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.id) {
      this.userId = user.id;
      this.loadUserSelectedDates();
    } else {
      console.error('User not found in local storage!');
    };    this.loadMeats();


  }

  loadPublicHolidays() {
    this.holidayService.getAllHolidays().subscribe({
      next: (data) => {
        this.publicHolidays = data.map((holiday: any) => new Date(holiday.date)); 
        console.log(this.publicHolidays);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  // Load user selected dates from the backend
  loadMeats() {
    this.meatService.getAllMeats().subscribe({
      next: (meats) => (this.meats = meats),
      error: (err) => console.error('Error loading meats:', err)
    });
  }
  loadUserSelectedDates(): void {
    if (this.userId) {
      this.lunchRegistrationService.getSelectedDates(this.userId).subscribe(
        (registeredDates: Date[]) => {
          console.log(registeredDates);
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

  populateAllWeekdaysExcludingCurrentWeek(month: Date): void {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    

    this.selectedDates = [];
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      
      if (!this.isCurrentWeek(date) && date.getDay() !== 0 && date.getDay() !== 6 && date > today) {
        this.selectedDates.push(date);
      }
    }
  }

  isBeforeOrToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() <= today.getTime();
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; 
  }

  isCurrentWeek(date: Date): boolean {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday of the current week
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));   // Sunday of the current week

    return date >= startOfWeek && date <= endOfWeek;
  }

  toggleDate(date: Date): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (!this.isBeforeOrToday(date) && !this.isWeekend(date) && !this.isCurrentWeek(date)) {
      const index = this.selectedDates.findIndex(selectedDate => selectedDate.getTime() === date.getTime());
      if (index === -1) {
        this.selectedDates.push(date); 
      } else {
        this.selectedDates.splice(index, 1); 
      }
    }
  }

  isPublicHoliday(date: Date): boolean {
    return this.publicHolidays.some(holiday => this.isSameDay(date, holiday));
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Check if a date is selected
  isDateSelected(date: Date): boolean {
    return this.selectedDates.some(selectedDate => selectedDate.getTime() === date.getTime());
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

  getEmptyDaysBefore(month: Date): Date[] {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const emptyDays = [];
    const dayOfWeek = firstDay.getDay();

    for (let i = 0; i < dayOfWeek; i++) {
      emptyDays.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), i - dayOfWeek + 1));
    }
    return emptyDays;
  }

  goToPreviousMonth(): void {
    if (!this.isFirstMonth()) {
      const prevMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
      this.currentMonth = prevMonth;
      this.generateCalendarDates(this.currentMonth);
      this.loadUserSelectedDates();
    }
  }

  goToNextMonth(): void {
    if (this.isLastWeekOfMonth() && this.isCurrentMonth()) {
      const nextMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
      this.currentMonth = nextMonth;
      this.generateCalendarDates(this.currentMonth);
  
      this.autoSelectAllWeekdays(nextMonth);
      this.loadUserSelectedDates();
    }
  }
  
  autoSelectAllWeekdays(month: Date): void {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    this.selectedDates = [];
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        this.selectedDates.push(date);
      }
    }
  }

isCurrentMonth(): boolean {
  const today = new Date();
  return (
    today.getFullYear() === this.currentMonth.getFullYear() &&
    today.getMonth() === this.currentMonth.getMonth()
  );
}
  isLastWeekOfMonth(): boolean {
    const today = new Date();
    const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0).getDate();
    return today.getDate() >= lastDay - 6; 
  }

  isFirstMonth(): boolean {
    return this.currentMonth.getFullYear() === this.today.getFullYear() &&
           this.currentMonth.getMonth() === this.today.getMonth();
  }

  submitRegistration(): void {
    if (this.userId) {
      const registrationDto: LunchRegistrationDTO = {
        userId: this.userId,
        selectedDates: this.selectedDates.map((date) => date.toISOString()), // Format dates as ISO strings
      };

      if (this.isCurrentMonth()) {
        if (this.isFirstRegistration) {
          this.lunchRegistrationService.registerUserForLunch(registrationDto).subscribe(
            (response) => {
              console.log('Registration successful for current month:', response);
              this.isFirstRegistration = false;
              this.openVeganModal();
            },
            (error) => {
              console.error('Error registering for current month:', error);
              alert('Error registering for current month!');
            }
          );
        } else {
          this.lunchRegistrationService.updateLunchRegistration(this.userId, registrationDto).subscribe(
            (response) => {
              console.log('Registration updated successfully for current month:', response);
              alert('Registration updated successfully for current month!');
            },
            (error) => {
              console.error('Error updating registration for current month:', error);
              alert('Error updating registration for current month!');
            }
          );
        }
      } else {
        // Handle next month registration
        if (this.isFirstRegistration) {
          this.lunchRegistrationService.registerUserForLunch(registrationDto).subscribe(
            (response) => {
              console.log('Registration successful for next month:', response);
              alert('Registration successful for next month!');
              this.isFirstRegistration = false;
              this.openVeganModal();
            },
            (error) => {
              console.error('Error registering for next month:', error);
              alert('Error registering for next month!');
            }
          );
        } else {
          this.lunchRegistrationService.updateLunchRegistrationForNextMonth(this.userId, registrationDto).subscribe(
            (response) => {
              console.log('Registration updated successfully for next month:', response);
              alert('Registration updated successfully for next month!');
            },
            (error) => {
              console.error('Error updating registration for next month:', error);
              alert('Error updating registration for next month!');
            }
          );
        }
      }
    } else {
      console.error('User ID is not set!');
      alert('User ID is not set!');
    }
  }
  openVeganModal() {
    this.showVeganModal = true;
  }
  setVegan(isVegan: boolean) {
    this.showVeganModal = false;
    if (isVegan) {
      this.saveDietaryPreference(true, []);
    } else {
      this.showMeatModal = true;
    }
  }

  toggleMeatSelection(meat: Meat) {
    const index = this.selectedMeats.indexOf(meat.id);
    if (index > -1) {
      this.selectedMeats.splice(index, 1);
    } else {
      this.selectedMeats.push(meat.id);
    }
  }

  submitAvoidedMeats() {
    this.saveDietaryPreference(false, this.selectedMeats);
    this.closeModal();
  }

  closeModal() {
    this.showVeganModal = false;
    this.showMeatModal = false;
  }

  saveDietaryPreference(isVegan: boolean, meatIds: number[]) {
    const preference: DietaryPreference = {
      userId: this.userId,
      isVegan,
      meatIds
    };
    this.userService.saveDietaryPreference(preference).subscribe({
      next: (response) => {
          console.log('Dietary preference saved successfully:', response);
      },
      error: (err) => {
          console.error('Error saving dietary preference:', err);
      }
  });
  
}
}