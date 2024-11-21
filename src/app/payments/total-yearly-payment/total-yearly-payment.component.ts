import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/Department';
import { WeeklyPaymentService } from '../../services/weekly-payment.service';
import { DepartmentServiceService } from '../../services/department-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-yearly-payment',
  templateUrl: './total-yearly-payment.component.html',
  styleUrl: './total-yearly-payment.component.css'
})
export class TotalYearlyPaymentComponent implements OnInit{
  totalCost: number = 0; 
  totalCostAllDepartments: number = 0; 
  registeredDateCount: number = 0;
  selectedMonth: number = new Date().getMonth() + 1; 
  selectedYear: number = new Date().getFullYear();
  selectedDepartmentId: number | null = null; 
 
  years: number[] = []; 
  departments: Department[] = []; 

  constructor(
    private weeklyPaymentService: WeeklyPaymentService,
    private departmentService: DepartmentServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchTotalCostAndDateCount();
    this.initializeYears(); 
  }

  fetchTotalCostAndDateCount(): void {
    if (this.selectedDepartmentId === null) {
      this.weeklyPaymentService.getAllTotalCostAndDateCountForYear(this.selectedYear).subscribe(
        (response) => {
          this.totalCostAllDepartments = response.totalCost;
          this.totalCost = 0; 
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
          this.totalCost = response.totalCost; 
          this.totalCostAllDepartments = 0;
          this.registeredDateCount = response.registeredDateCount;
        },
        (error) => {
          console.error('Error fetching total cost for selected department:', error);
        }
      );
    }
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 5; i--) {
      this.years.push(i);
    }
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

  onDepartmentChange(): void {
    this.fetchTotalCostAndDateCount();
  }
  
  onYearChange(): void {
    this.fetchTotalCostAndDateCount();
  }


}
