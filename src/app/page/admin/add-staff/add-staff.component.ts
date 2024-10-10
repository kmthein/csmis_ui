import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { StaffDataService } from '../../../services/staff-data/staff-data.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})
export class AddStaffComponent {
  statusList = ['Active', 'InActive'];
  divisions: any = [];
  departments: any = [];
  teams: any = [];
  addNewDivision: boolean = false;
  addNewDepart: boolean = false;
  addNewTeam: boolean = false;
  roleList = ['OPERATOR', 'ADMIN'];

  staff: any = {
    staffId: "",
    name: "",
    doorLogNo: "",
    email: "",
    isVegan: false
  };

  onChangeDivision(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === '') {
      this.addNewDivision = true;
    }
  }
  onChangeDepartment(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === '') {
      this.addNewDepart = true;
    }
  }
  onChangeTeam(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === '') {
      this.addNewTeam = true;
    }
  }

  backToStaffList() {
    this.router.navigate(['/admin/staff']);
  }

  constructor(private userService: UserService, private router: Router, private dataService: StaffDataService) {}

  ngOnInit(): void {
    this.dataService.getAllDivision().subscribe((data) => {
      this.divisions = data;
      this.staff.division = data[0].name;
    });
    this.dataService.getAllDepartment().subscribe((data) => {
      this.departments = data;
      this.staff.department = data[0].name;
    });
    this.dataService.getAllTeam().subscribe((data) => {
      this.teams = data;
      this.staff.team = data[0].name;
    });
    this.staff.status = "Active";
    this.staff.role = "OPERATOR";
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const formData = new FormData();
    for (let key in form.value) {
      if (form.value.hasOwnProperty(key)) {
        if (form.value[key]) {
          formData.append(key, form.value[key]);
        }
      }
    }
    formData.append('role', "OPERATOR");
    this.userService.addStaff(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/staff']);
      },
      error: (error) => {
        console.error(error);
      },
    });;    
  }
}
