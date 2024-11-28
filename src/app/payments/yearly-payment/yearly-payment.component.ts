import { Component } from '@angular/core';
import { WeeklyPaymentService } from '../../services/weekly-payment.service';
import { Router } from '@angular/router';
import { DepartmentServiceService } from '../../services/department-service.service';
import { Department } from '../../models/Department';

@Component({
  selector: 'app-yearly-payment',
  templateUrl: './yearly-payment.component.html',
  styleUrls: ['./yearly-payment.component.css']
})
export class YearlyPaymentComponent {
  totalCost: number = 0; // Total cost for the selected department
  totalCostAllDepartments: number = 0; // Total cost for all departments
  registeredDateCount: number = 0;
  selectedYear: number = new Date().getFullYear(); // Default to the current year
  selectedDepartmentId: number | null = null; // Selected department (null means "All Departments")
  years: number[] = []; // Dynamic list of years (e.g., last 5 years)
  departments: Department[] = []; // List of departments

  constructor(
    private weeklyPaymentService: WeeklyPaymentService,
    private departmentService: DepartmentServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDepartments(); // Fetch departments on init
    this.fetchTotalCostAndDateCount(); // Fetch total cost and date count for the default selection
    this.initializeYears(); // Initialize the years list
  }

  fetchTotalCostAndDateCount(): void {
    if (this.selectedDepartmentId === null) {
      this.weeklyPaymentService.getTotalCostAndDateCountForYear(this.selectedYear).subscribe(
        (response) => {
          this.totalCostAllDepartments = response.totalCost; // Update all departments cost
          this.totalCost = 0; // Reset department-specific cost
          this.registeredDateCount = response.registeredDateCount;
        },
        (error) => {
          console.error('Error fetching total cost for all departments:', error);
        }
      );
    } else {
      this.weeklyPaymentService.getTotalCostAndDateCountForYear(
        this.selectedYear,
        this.selectedDepartmentId
      ).subscribe(
        (response) => {
          this.totalCost = response.totalCost; // Update selected department cost
          this.totalCostAllDepartments = 0; // Reset all departments cost
          this.registeredDateCount = response.registeredDateCount;
        },
        (error) => {
          console.error('Error fetching total cost for selected department:', error);
        }
      );
    }
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

  // Handle department selection change
  onDepartmentChange(): void {
    this.fetchTotalCostAndDateCount();
  }

  // Handle year selection change
  onYearChange(): void {
    this.fetchTotalCostAndDateCount();
  }

  // Navigate to another page
  goToYearlyPage(): void {
    this.router.navigate(['/yearly']);
  }
}
