import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/Department';
import { WeeklyPaymentService } from '../../services/weekly-payment.service';
import { DepartmentServiceService } from '../../services/department-service.service';

@Component({
  selector: 'app-companyweekly-payment',
  templateUrl: './companyweekly-payment.component.html',
  styleUrls: ['./companyweekly-payment.component.css'], // Corrected `styleUrl` to `styleUrls`
})
export class CompanyweeklyPaymentComponent implements OnInit {
  totalCompanyCost: number = 0;
  departments: Department[] = [];
  selectedDepartmentId: number | null = null; // Default is null to indicate "All Departments"

  constructor(
    private companyCostService: WeeklyPaymentService, // Use the service for company cost
    private departmentService: DepartmentServiceService
  ) {}

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchCompanyCost(); // Fetch data for "All Departments" initially
  }

  // Fetch all departments
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

  // Fetch total company cost based on selected department or for all departments
  fetchCompanyCost(): void {
    this.companyCostService
      .getCompanyCostWeekly(this.selectedDepartmentId ?? undefined) // Send undefined for "All Departments"
      .subscribe(
        (response) => {
          this.totalCompanyCost = response.totalCompanyCost;
        },
        (error) => {
          console.error('Error fetching company cost', error);
        }
      );
  }

  // Handle department dropdown change
  onDepartmentChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    // Check if the "All Departments" option is selected (value is empty string)
    this.selectedDepartmentId =
      selectElement.value === '' ? null : +selectElement.value;

    // Fetch cost data based on the selected department
    this.fetchCompanyCost();
  }
}
