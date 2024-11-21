import { Component, OnInit } from '@angular/core';
import { LunchRegistrationService } from '../../services/lunch-registration.service';
import { LunchRegistrationDTO } from '../../DTO/LunchRegistrationDTO';
import { HolidayService } from '../../services/admin/holiday.service';
import { error } from 'jquery';
import { Meat } from '../../models/meat';
import { MeatService } from '../../services/meat.service';
import { DietaryPreference } from '../../models/DietaryPreference';
import { UserService } from '../../services/user/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-lunch-registration',
  templateUrl: './lunch-registration.component.html',
  styleUrls: ['./lunch-registration.component.css']
})
export class LunchRegistrationComponent implements OnInit {
  [x: string]: any;
  currentMonth: Date = new Date();
  selectedDates: Date[] = [];
  currentMonthDates: Date[] = [];
  today: Date;
  userId!: number ;
  isFirstRegistration: boolean = true; 
  meats: Meat[] = [];
  showVeganModal = false;
  showMeatModal = false;
  selectedMeats: number[] = [];
  lunchPrice: number = 0;
  companyRate: number = 0;
  registeredDays: number = 0;
  userCost: number | undefined;
  companyCost: number | undefined;
  estMonthlyCost: number = 0;

  public publicHolidays: { date: Date, name: string }[] = [];


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

    
    this.lunchRegistrationService.getLunchDetails(this.userId).subscribe(data => {
      this.lunchPrice = data.lunchPrice;
      this.companyRate = data.companyRate;
      this.registeredDays = data.registeredDays;

      this.calculateCost();
    });
  }
  
  calculateCost(): void {
    if (this.lunchPrice > 0 && this.companyRate >= 0 && this.registeredDays > 0) {
      const userSharePercentage = 100 - this.companyRate;
      const userCostPerDay = (this.lunchPrice * userSharePercentage) / 100;
      const companyCostPerDay = (this.lunchPrice * this.companyRate) / 100;
      this.estMonthlyCost = this.lunchPrice * this.registeredDays;

      this.userCost = userCostPerDay * this.registeredDays;
      this.companyCost = companyCostPerDay * this.registeredDays;
    }
  }
  loadPublicHolidays() {
    this.holidayService.getAllHolidays().subscribe({
      next: (data) => {
        this.publicHolidays = data.map((holiday: any) => ({
          date: new Date(holiday.date),
          name: holiday.name // Assuming holiday name is available in the response
        }));
        console.log(this.publicHolidays); // Check the structure
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getHolidayName(date: Date): string | null {
    const formattedDate = date.toISOString().split('T')[0]; 
    const holiday = this.publicHolidays.find(holiday => {
      return holiday.date.toISOString().split('T')[0] === formattedDate; 
    });
    return holiday ? holiday.name : null;
  }
  
  
  loadMeats() {
    this.meatService.getAllMeats().subscribe({
      next: (meats) => (this.meats = meats),
      error: (err) => console.error('Error loading meats:', err)
    });
  }
  loadUserSelectedDates(): void {
    if (this.userId) {
      this.lunchRegistrationService.getSelectedDates(this.userId).pipe(
        catchError(error => {
          console.error('Error loading selected dates:', error);
          this.populateAllWeekdaysExcludingCurrentWeek(this.currentMonth);
          return of([]); // Fallback with empty array on error
        })
      ).subscribe((registeredDates: Date[]) => {
        this.selectedDates = registeredDates.map(dateStr => new Date(dateStr));
        this.generateCalendarDates(this.currentMonth); 
        this.loadPublicHolidays(); 
        this.isFirstRegistration = this.selectedDates.length === 0;
        if (this.isFirstRegistration) this.populateAllWeekdaysExcludingCurrentWeek(this.currentMonth);
      });
    }
  }
  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
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
  isRegistered(date: Date): boolean {
    return this.selectedDates.some(
      (registeredDate) =>
        registeredDate.getDate() === date.getDate() &&
        registeredDate.getMonth() === date.getMonth() &&
        registeredDate.getFullYear() === date.getFullYear()
    );
  }
  isBeforeOrToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isWeekday = date.getDay() !== 0 && date.getDay() !== 6;
    return isWeekday && date.getTime() <= today.getTime();
  }
  

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
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

  isPublicHoliday(date: Date): string | null {
    const holiday = this.publicHolidays.find(holiday => this.isSameDay(date, holiday.date));
    return holiday ? holiday.name : null;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

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