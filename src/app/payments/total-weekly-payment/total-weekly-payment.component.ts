import { Component, OnInit } from '@angular/core';
import { WeeklyPaymentService } from '../../services/weekly-payment.service';
import { Department } from '../../models/Department';
import { DepartmentServiceService } from '../../services/department-service.service';

@Component({
  selector: 'app-total-weekly-payment',
  templateUrl: './total-weekly-payment.component.html',
  styleUrl: './total-weekly-payment.component.css'
})
export class TotalWeeklyPaymentComponent implements OnInit {
  totalCost: number = 0;
  registeredDateCount: number = 0;
  departments: Department[] = [];
  selectedDepartmentId: number | null = null;

  constructor(private weeklyPaymentService: WeeklyPaymentService, 
              private departmentService: DepartmentServiceService) {}

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

  fetchTotalCostAndDateCount(): void {
    this.weeklyPaymentService.getTotalCostAndDateCount(this.selectedDepartmentId ?? undefined).subscribe(
      (response) => {
        this.totalCost = response.totalCost;
        this.registeredDateCount = response.registeredDateCount;
      },
      (error) => {
        console.error('Error fetching total cost and date count', error);
      }
    );
  }
  

  // Triggered when a department is selected from the dropdown
  onDepartmentChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDepartmentId = selectElement.value ? +selectElement.value : null;  // Set selected department
    this.fetchTotalCostAndDateCount();  // Fetch data for the selected department
  }
}
