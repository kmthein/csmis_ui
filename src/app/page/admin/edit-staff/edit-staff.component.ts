import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { NgForm } from '@angular/forms';
import { StaffDataService } from '../../../services/staff-data/staff-data.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.css',
})
export class EditStaffComponent {
  id!: number;
  staff: any;
  viewMode: boolean = true;
  statusList = ['Active', 'InActive'];
  divisions: any = [];
  departments: any = [];
  teams: any = [];
  addNewDivision: boolean = false;
  addNewDepart: boolean = false;
  addNewTeam: boolean = false;

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

  toggleView(bool: boolean) {
    this.viewMode = bool;
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private dataService: StaffDataService
  ) {}

  backToStaffList() {
    this.router.navigate(['/admin/staff']);
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);

    this.userService.getStaffById(this.id).subscribe((data) => {
      this.staff = data;
    });
    this.dataService.getAllDivision().subscribe((data) => {
      this.divisions = data;
    });
    this.dataService.getAllDepartment().subscribe((data) => {
      this.departments = data;
    });
    this.dataService.getAllTeam().subscribe((data) => {
      this.teams = data;
    });
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
    formData.append('role', this.staff?.role.toUpperCase());
    formData.append('isVegan', this.staff?.isVegan);
    this.userService.updateStaff(formData, this.id).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/staff']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
