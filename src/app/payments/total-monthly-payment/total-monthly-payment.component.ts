import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/Department';
import { WeeklyPaymentService } from '../../services/weekly-payment.service';
import { DepartmentServiceService } from '../../services/department-service.service';

@Component({
  selector: 'app-total-monthly-payment',
  templateUrl: './total-monthly-payment.component.html',
  styleUrl: './total-monthly-payment.component.css'
})
export class TotalMonthlyPaymentComponent implements OnInit {
  totalCost: number = 0; // Total cost for the selected department
  totalCostAllDepartments: number = 0; // Total cost for all departments
  registeredDateCount: number = 0;
  selectedMonth: number = new Date().getMonth() + 1; // Default to the current month
  selectedYear: number = new Date().getFullYear(); // Default to the current year
  selectedDepartmentId: number | null = null; // Selected department (null means "All Departments")
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = []; // Dynamic list of years (e.g., last 5 years)
  departments: Department[] = []; // List of departments

  constructor(
    private weeklyPaymentService: WeeklyPaymentService,
    private departmentService: DepartmentServiceService,
  ) {}

  ngOnInit(): void {
    this.fetchDepartments(); 
    this.fetchTotalCostAndDateCount(); 
    this.initializeYears(); 
  }

  fetchTotalCostAndDateCount(): void {
    const departmentId = this.selectedDepartmentId;
    this.weeklyPaymentService.getAllTotalCostAndDateCountForMonth(
      this.selectedMonth,
      this.selectedYear,
      departmentId ?? undefined
    ).subscribe(
      (response) => {
        if (departmentId === null) {
          this.totalCostAllDepartments = response.totalCost; // Update all departments cost
          this.totalCost = 0; // Reset department-specific cost
        } else {
          this.totalCost = response.totalCost; // Update selected department cost
          this.totalCostAllDepartments = 0; // Reset all departments cost
        }
        this.registeredDateCount = response.registeredDateCount;
      },
      (error) => {
        console.error('Error fetching total cost:', error);
      }
    );
  }

  // Initialize years for the dropdown (e.g., last 5 years)
  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 5; i--) {
      this.years.push(i);
    }
  }

  // Fetch departments from the department service
  fetchDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      (departments) => {
        this.departments = departments; // Populate the dropdown
      },
      (error) => {
        console.error('Error fetching departments', error);
      }
    );
  }

  onDepartmentChange(): void {
    this.fetchTotalCostAndDateCount();
  }

  onMonthChange(): void {
    this.fetchTotalCostAndDateCount();
  }

  onYearChange(): void {
    this.fetchTotalCostAndDateCount();
  }

  }

