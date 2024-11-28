import { Component, OnInit } from '@angular/core';
import { WeeklyPaymentComponent } from '../weekly-payment/weekly-payment.component';
import { MonthlyPaymentComponent } from '../monthly-payment/monthly-payment.component';
import { YearlyPaymentComponent } from '../yearly-payment/yearly-payment.component';
import { CompanyMonthlyPaymentComponent } from '../company-monthly-payment/company-monthly-payment.component';
import { CompanyYearlyPaymentComponent } from '../company-yearly-payment/company-yearly-payment.component';
import { CompanyweeklyPaymentComponent } from '../companyweekly-payment/companyweekly-payment.component';
import { TotalMonthlyPaymentComponent } from '../total-monthly-payment/total-monthly-payment.component';
import { TotalWeeklyPaymentComponent } from '../total-weekly-payment/total-weekly-payment.component';
import { TotalYearlyPaymentComponent } from '../total-yearly-payment/total-yearly-payment.component';
@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrl: './view-payment.component.css'
})
export class ViewPaymentComponent implements OnInit {
  view: string = 'total_yearly'; 

  constructor() { }

  ngOnInit(): void {}
  activeDropdown: string | null = null; // Track which dropdown is active

  openDropdown(type: string): void {
    // Open the dropdown on hover
    this.activeDropdown = type;
  }

  closeDropdown(): void {
    // Close the dropdown when mouse leaves
    this.activeDropdown = null;
  }

  toggleDropdown(type: string): void {
    // Toggle the dropdown on click
    this.activeDropdown = this.activeDropdown === type ? null : type;
  }

}