import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/Department';
import { WeeklyPaymentService } from '../../services/weekly-payment.service';
import { DepartmentServiceService } from '../../services/department-service.service';

@Component({
  selector: 'app-companyweekly-payment',
  templateUrl: './companyweekly-payment.component.html',
  styleUrl: './companyweekly-payment.component.css'
})
export class CompanyweeklyPaymentComponent implements OnInit {
  totalCompanyCost: number = 0;
  departments: Department[] = [];
  selectedDepartmentId: number | null = null;

  constructor(private companyCostService: WeeklyPaymentService,  // Use the service for company cost
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
    this.companyCostService.getCompanyCostWeekly(this.selectedDepartmentId).subscribe(
      (response) => {
        this.totalCompanyCost = response.totalCompanyCost;
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
}
