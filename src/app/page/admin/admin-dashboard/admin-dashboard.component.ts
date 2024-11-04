import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  dueDate: any = "Monday";
  dueTime: any;

  onSubmit(form: NgForm) {
    console.log(form.value);
    
  }
}
