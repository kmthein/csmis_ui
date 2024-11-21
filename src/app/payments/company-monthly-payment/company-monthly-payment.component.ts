import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/Department';
import { WeeklyPaymentService } from '../../services/weekly-payment.service';
import { DepartmentServiceService } from '../../services/department-service.service';

@Component({
  selector: 'app-company-monthly-payment',
  templateUrl: './company-monthly-payment.component.html',
  styleUrl: './company-monthly-payment.component.css'
})
export class CompanyMonthlyPaymentComponent implements OnInit{
  totalCompanyCost: number = 0;
  registeredDateCount: number = 0;
  departments: Department[] = [];
  selectedDepartmentId: number | null = null;
  selectedMonth: number = new Date().getMonth() + 1;  // Default to current month
  selectedYear: number = new Date().getFullYear();  // Default to current year

  constructor(private companyCostService: WeeklyPaymentService, 
              private departmentService: DepartmentServiceService) {}

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchCompanyCost();
  }

  fetchDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      (departments) => {
        this.departments = departments;
      },
      (error) => {
        console.error('Error fetching departments', error);
      }
    );
  }

  fetchCompanyCost(): void {
    this.companyCostService.getCompanyCost(this.selectedMonth, this.selectedYear, this.selectedDepartmentId).subscribe(
      (response) => {
        this.totalCompanyCost = response.totalCompanyCost;
        this.registeredDateCount = response.registeredDateCount;
      },
      (error) => {
        console.error('Error fetching company cost', error);
      }
    );
  }

  onDepartmentChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDepartmentId = selectElement.value ? +selectElement.value : null;
    this.fetchCompanyCost();
  }

  onMonthYearChange(): void {
    this.fetchCompanyCost();
  }
}
