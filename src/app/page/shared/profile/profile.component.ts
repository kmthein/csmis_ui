import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  viewMode: boolean = true;
  user: any = {};

  toggleMode(bool: boolean) {
    this.viewMode = bool;
  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userService.getStaffById(user?.id).subscribe((res) => {
      this.user = res;
    });
  }
}
