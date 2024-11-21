import { Component, OnInit } from '@angular/core';
import { WeeklyPaymentDTO } from '../../DTO/WeeklyPaymentDTO';
import { WeeklyPaymentService } from '../../services/weekly-payment.service';
import { Department } from '../../models/Department';
import { DepartmentServiceService } from '../../services/department-service.service';

@Component({
  selector: 'app-weekly-payment',
  templateUrl: './weekly-payment.component.html',
  styleUrls: ['./weekly-payment.component.css']
})
export class WeeklyPaymentComponent implements OnInit {
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
    this.weeklyPaymentService.getTotalCostAndDateCount().subscribe(
      (response) => {
        this.totalCost = response.totalCost;
        this.registeredDateCount = response.registeredDateCount;
      },
      (error) => {
        console.error('Error fetching total cost and date count', error);
      }
    );
  }

  onDepartmentChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDepartmentId = selectElement.value ? +selectElement.value : null;
    this.fetchTotalCostAndDateCount();
  }
}