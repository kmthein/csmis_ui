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
import { Settings } from '../../DTO/Settings';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lunch-registration',
  templateUrl: './lunch-registration.component.html',
  styleUrls: ['./lunch-registration.component.css'],
})
export class LunchRegistrationComponent implements OnInit {
  [x: string]: any;
  currentForMonth = new Date().getMonth(); // Current month (0-based index)

  currentMonth: Date = new Date();
  selectedDates: Date[] = [];
  currentMonthDates: Date[] = [];
  today: Date;
  userId!: number;
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
  isNextMonthView = false;
  settings: Settings | undefined;
  userCostPerDay: number =0;
  userMonthlyCost: number = 0;
 
  registeredDates: number = 0;


  public publicHolidays: { date: Date; name: string }[] = [];

  constructor(
    private lunchRegistrationService: LunchRegistrationService,
    private meatService: MeatService,
    private userService: UserService,
    private holidayService: HolidayService,
    private toast: ToastrService
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.loadPublicHolidays();
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.id) {
      this.userId = user.id;
      this.loadUserSelectedDates();
      this.lunchRegistrationService.getLunchDetails(this.userId).subscribe(data => {
        console.log('Data from backend:', data); // Log the response to verify the structure
        this.lunchPrice = data.lunchPrice;
        this.companyRate = data.companyRate;
        this.registeredDates = data.registeredDates;  // This should be a number (int)
      
        this.calculateCost();  // Perform the cost calculation based on the received data
    });
    
    } else {
      console.error('User not found in local storage!');
    };    this.loadMeats();
    this['selectedMonth'] = this.currentMonth;

    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    if (this['selectedMonth'] === nextMonth.getMonth()) {
      this.isNextMonthView = true;
    }
    
   
    this.loadRegistrationCutoff();

  }
  scheduleNextWeekCheck() {
    setInterval(() => {
      this.checkRegistrationWindow();
    }, 24 * 60 * 60 * 1000); // 24 hours interval (milliseconds)
  }
  
  checkRegistrationWindow() {
    console.log("Checking registration window...");
  }
  calculateCost(): void {
    if (
      this.lunchPrice > 0 &&
      this.companyRate >= 0 &&
      this.registeredDates > 0 // Ensure registeredDates is a positive number
    ) {
      // Get the current month and year
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // 0-based (Jan = 0)
      const currentYear = currentDate.getFullYear();

      // Calculate user cost per day and company cost per day based on fetched data
      const userSharePercentage = 100 - this.companyRate;
      const userCostPerDay = (this.lunchPrice * userSharePercentage) / 100;
      const companyCostPerDay = (this.lunchPrice * this.companyRate) / 100;

      // Calculate monthly costs
      const userMonthlyCost = userCostPerDay * this.registeredDates;
      const companyMonthlyCost = companyCostPerDay * this.registeredDates;
      const estimatedMonthlyCost = this.lunchPrice * this.registeredDates;

      console.log('User cost per day:', userCostPerDay);
      console.log('Company cost per day:', companyCostPerDay);
      console.log('Registered days:', this.registeredDates);
      console.log('User monthly cost:', userMonthlyCost);
      console.log('Company monthly cost:', companyMonthlyCost);
      console.log('Estimated monthly cost:', estimatedMonthlyCost);

      // Update UI or state with the calculated costs
      this.userCostPerDay = userCostPerDay;
      this.userMonthlyCost = userMonthlyCost;
      
    }
}


  
  loadRegistrationCutoff(): void {
    this.lunchRegistrationService.getRegistrationCutoff().subscribe(
      (data) => {
        this.settings = data;  
        console.log("Registration cutoff:", this.settings);

      },
      (error) => {
        console.error('Error loading registration cutoff:', error);
      }
    );
  }
  // getLunchCostPerDayByUserId(userId: number): void {
  //   this.http.get(`/api/lunch/cost-per-day/user/${userId}`).subscribe((data: any) => {
  //     console.log('Lunch cost details:', data);
  //     this.lunchPrice = data.lunchPrice;
  //     this.userCostPerDay = data.userCostPerDay;
  //     this.companyCostPerDay = data.companyCostPerDay;
  //   });
  // }
  
  loadPublicHolidays() {
    this.holidayService.getAllHolidays().subscribe({
      next: (data) => {
        this.publicHolidays = data.map((holiday: any) => ({
          date: new Date(holiday.date),
          name: holiday.name, 
        }));
        console.log(this.publicHolidays); // Check the structure
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  getHolidayName(date: Date): string | null {
    const formattedDate = date.toISOString().split('T')[0];
    const holiday = this.publicHolidays.find((holiday) => {
      return holiday.date.toISOString().split('T')[0] === formattedDate;
    });
    return holiday ? holiday.name : null;
  }
  isHoliday(date: Date): boolean {
    return this.getHolidayName(date) !== null;
  }
         
  loadMeats() {
    this.meatService.getAllMeats().subscribe({
      next: (meats) => (this.meats = meats),
      error: (err) => console.error('Error loading meats:', err),
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
        if (this.isFirstRegistration) this.canRegisterForNextWeek;

this.canRegisterForNextWeek 
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
    today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison
  
    const canRegisterForNextWeek = this.canRegisterForNextWeek();
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
  
      if (
        !this.isCurrentWeek(date) && // Not in the current week
        date.getDay() !== 0 && // Not Sunday
        date.getDay() !== 6 && // Not Saturday
        date > today && // Future dates only
        !this.isPublicHoliday(date) // Exclude public holidays
      ) {
        if (this.isNextWeek(date)) {
          continue;
        }
  
        // Push the valid date
        this.selectedDates.push(date);
      }
    }
  
    console.log('Selected Dates (excluding public holidays):', this.selectedDates);
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
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setDate(today.getDate() - today.getDay()); // Start of this week (Sunday)

  const endOfCurrentWeek = new Date(startOfCurrentWeek);
  endOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + 6); // End of this week (Saturday)

  return date >= startOfCurrentWeek && date <= endOfCurrentWeek;
}

  
toggleDate(date: Date): void {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (
    !this.isBeforeOrToday(date) &&
    !this.isWeekend(date) &&
    !this.isCurrentWeek(date)
  ) {
    const index = this.selectedDates.findIndex(
      (selectedDate) => selectedDate.getTime() === date.getTime()
    );
    if (index === -1) {
      this.selectedDates.push(date);
    } else {
      this.selectedDates.splice(index, 1);
    }
    this.generateCalendarDates(this.currentMonth); // Make sure to refresh the calendar
  }
}


  isPublicHoliday(date: Date): string | null {
    const holiday = this.publicHolidays.find((holiday) =>
      this.isSameDay(date, holiday.date)
    );
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
    return this.selectedDates.some(
      (selectedDate) => selectedDate.getTime() === date.getTime()
    );
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
      emptyDays.push(
        new Date(firstDay.getFullYear(), firstDay.getMonth(), i - dayOfWeek + 1)
      );
    }
    return emptyDays;
  }

  goToPreviousMonth(): void {
    if (!this.isFirstMonth()) {
      const prevMonth = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() - 1,
        1
      );
      this.currentMonth = prevMonth;
      this.generateCalendarDates(this.currentMonth);
      this.loadUserSelectedDates();
    }
  }

  goToNextMonth(): void {
    if (this.isLastWeekOfMonth() && this.isCurrentMonth()) {
      const nextMonth = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() + 1,
        1
      );
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
    const lastDay = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      0
    ).getDate();
    return today.getDate() >= lastDay - 6;
  }

  isFirstMonth(): boolean {
    return (
      this.currentMonth.getFullYear() === this.today.getFullYear() &&
      this.currentMonth.getMonth() === this.today.getMonth()
    );
  }

  submitRegistration(): void {
   
    if (this.userId) {
      const registrationDto: LunchRegistrationDTO = {
        userId: this.userId,
        selectedDates: this.selectedDates.map((date) => date.toISOString()), // Format dates as ISO strings
      };
      console.log(registrationDto);

      if (this.isCurrentMonth()) {
        if (this.isFirstRegistration) {
          this.lunchRegistrationService
            .registerUserForLunch(registrationDto)
            .subscribe(
              (response) => {
                console.log(
                  'Registration successful for current month:',
                  response
                );
                this.isFirstRegistration = false;
                this.openVeganModal();
              },
              (error) => {
                console.error('Error registering for current month:', error);
                this.toast.error(" Error registering for current month!");
              }
            );
        } else {
          this.lunchRegistrationService
            .updateLunchRegistration(this.userId, registrationDto)
            .subscribe(
              (response) => {
                console.log(
                  'Registration updated successfully for current month:',
                  response
                );
                this.toast.success(" Registration updated successfully for current month!");
              },
              (error) => {
                console.error(
                  'Error updating registration for current month:',
                  error
                );
                this.toast.error("Error updating registration for current month! ");
              }
            );
        }
      } else {
        
        if (this.isFirstRegistration) {
          this.lunchRegistrationService.registerUserForLunch(registrationDto).subscribe(
            (response) => {
              console.log('Registration successful for next month:', response);
              this.toast.success(" Registration successful for next month!");
              this.isFirstRegistration = false;
            },
            (error) => {
              console.error('Error registering for next month:', error);
              
              this.toast.error("Error registering for next month! ");
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
      meatIds,
    };
    this.userService.saveDietaryPreference(preference).subscribe({
      next: (response) => {
        console.log('Dietary preference saved successfully:', response);
      },
      error: (err) => {
        console.error('Error saving dietary preference:', err);
      },
    });
  }

  handleRegistrationClick(): void {
  if ( !this.isCurrentMonth() && !this.isFirstRegistration) {
    this.toast.error("Registration for next month is now closed. Please try again next month.! ");

  } else if (this.isCurrentMonth()  || this.isFirstRegistration) {
    this.submitRegistration();
  }
}
isNextWeek(date: Date): boolean {
  const today = new Date();
  const startOfNextWeek = new Date(today);
  startOfNextWeek.setDate(today.getDate() + (7 - today.getDay())); // Start of next week (next Monday)

  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // End of next week (next Sunday)

  return date >= startOfNextWeek && date <= endOfNextWeek;
}

canRegisterForNextWeek(): boolean {
  if (!this.settings?.lastRegisterDay || !this.settings?.lastRegisterTime) {
    console.error("Settings or required properties are undefined");
    return false; // Ensure we don't proceed with undefined values
  }

  const currentDate = new Date();

  // Days of the week mapping to numbers (Sunday = 0, Monday = 1, ... )
  const dayNameToNumber: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Get the cutoff day (e.g., Friday)
  const cutoffDay = dayNameToNumber[this.settings.lastRegisterDay];
  if (cutoffDay === undefined) {
    console.error(`Invalid day name: ${this.settings.lastRegisterDay}`);
    return false;
  }

  // Calculate the cutoff date and time
  const cutoffDateTime = new Date(currentDate);
  const daysUntilCutoff = (cutoffDay - currentDate.getDay() + 7) % 7; // Days until next cutoff day (Friday)
  cutoffDateTime.setDate(currentDate.getDate() + daysUntilCutoff);

  // Set the cutoff time (e.g., 3:00 PM or 15:00)
  const [cutoffHour, cutoffMinute] = this.settings.lastRegisterTime.split(':').map(Number);
  cutoffDateTime.setHours(cutoffHour, cutoffMinute, 0, 0);

  // Log for debugging
  console.log("Current Date:", currentDate);
  console.log("Cutoff Date:", cutoffDateTime);

  // Check if today is Friday and if the current time is before the cutoff time
  if (currentDate.getDay() === cutoffDay) {
    if (currentDate < cutoffDateTime) {
      console.log("Registration for next week is allowed (before cutoff time on Friday)");
      return true; // Allow registration if it's before the cutoff time on Friday
    } else {
      console.log("Registration for next week is disabled (after cutoff time on Friday)");
      return false; // Registration is disabled after the cutoff time on Friday
    }
  }

  // If today is before the cutoff day, allow registration for next week
  if (currentDate.getDay() < cutoffDay) {
    console.log("Registration for next week is allowed (before cutoff day)");
    return true; // Allow registration for next week if today is before the cutoff day (Friday)
  }

  // If it's after the cutoff day and time, disable registration
  console.log("Registration for next week is disabled (cutoff day and time reached)");
  return false; // Registration for next week is disabled if today is after the cutoff day
}

isDateSelectable(date: Date): boolean {
  const currentDate = new Date();
  
  // Calculate next week's start and end date
  const nextWeekStart = new Date(currentDate);
  nextWeekStart.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
  nextWeekStart.setHours(0, 0, 0, 0);

  const nextWeekEnd = new Date(nextWeekStart);
  nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
  nextWeekEnd.setHours(23, 59, 59, 999);

  // If the date is within next week's range, check if registration is allowed
  if (date >= nextWeekStart && date <= nextWeekEnd) {
    return this.canRegisterForNextWeek(); // Only allow registration for next week if allowed
  }

  return true; // Allow selection for dates outside the next week
}

unselectAllDates(): void {
  this.selectedDates = [];
  console.log("All dates unselected:", this.selectedDates);
}
closetheModal(): void {
  this.showVeganModal = false;
}

}