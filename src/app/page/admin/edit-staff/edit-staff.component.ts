import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.css'
})
export class EditStaffComponent {
  id!: number;
  staff: any;
  viewMode: boolean = true;

  statusList = ["Active", "Inactive"];

  toggleView(bool: boolean) {
    this.viewMode = bool;
  }

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  backToStaffList() {
    this.router.navigate(['/admin/staff']);
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    
    this.userService.getStaffById(this.id).subscribe(data => {
      console.log(data);
      this.staff = data;
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
