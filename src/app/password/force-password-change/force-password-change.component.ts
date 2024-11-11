import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-force-password-change',
  templateUrl: './force-password-change.component.html',
  styleUrl: './force-password-change.component.css'
})
export class ForcePasswordChangeComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';
  errorMessage: string = '';
  successMessage: string = ''; // For success messages
  isLoading: boolean = false; // Loading state to show spinner or loading message
  passwordMismatch: boolean = false;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  navgiateBack() {
    this.router.navigate([`/login`])
  }

  checkPasswords() {
    this.passwordMismatch = this.newPassword !== this.confirmPassword;
  }

  onSubmit() {
    const user = this.authService.getUser();
    const formData = new FormData();
    formData.append("id", String(user?.id));
    formData.append("newPassword", this.newPassword);
    this.authService.forcePasswordChange(formData).subscribe({
      next: response => {
        if(response.status == "200") {
          const newUser = {...user, hasDefaultPassword: false};
          localStorage.setItem("user", JSON.stringify(newUser));
          if(user?.role == "ADMIN") {
            this.router.navigate([`/admin`])
          } else {
            this.router.navigate([`/`])
          }
        }
      }
    });
  }
}
