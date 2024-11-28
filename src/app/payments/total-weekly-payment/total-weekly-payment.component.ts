import { Component, OnInit } from '@angular/core';
import { WeeklyPaymentService } from '../../services/weekly-payment.service';
import { Department } from '../../models/Department';
import { DepartmentServiceService } from '../../services/department-service.service';

@Component({
  selector: 'app-total-weekly-payment',
  templateUrl: './total-weekly-payment.component.html',
  styleUrls: ['./total-weekly-payment.component.css'], // Fix `styleUrl` to `styleUrls`
})
export class TotalWeeklyPaymentComponent implements OnInit {
  totalCost: number = 0;
  registeredDateCount: number = 0;
  departments: Department[] = [];
  selectedDepartmentId: number | null = null;

  constructor(
    private weeklyPaymentService: WeeklyPaymentService,
    private departmentService: DepartmentServiceService
  ) {}

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchTotalCostAndDateCount();
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

  // Fetch total cost and registered date count based on department ID
  fetchTotalCostAndDateCount(): void {
    // Pass undefined if no specific department is selected
    this.weeklyPaymentService
      .getTotalCostAndDateCount(this.selectedDepartmentId || undefined)
      .subscribe(
        (response) => {
          this.totalCost = response.totalCost;
          this.registeredDateCount = response.registeredDateCount;
        },
        (error) => {
          console.error('Error fetching total cost and date count', error);
        }
      );
  }

  // Handle department dropdown change
  onDepartmentChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    // Explicitly handle "All Departments" option
    this.selectedDepartmentId =
      selectElement.value === '' ? null : +selectElement.value;

    // Fetch data for the newly selected department or all departments
    this.fetchTotalCostAndDateCount();
  }
}
