import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  passwordMismatch: boolean = false;
  isModalVisible: boolean = false; // Modal visibility

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    // Fetch email from query parameters
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  // Check if the passwords match
  checkPasswords() {
    this.passwordMismatch = this.newPassword !== this.confirmPassword;
  }

  // Handle password reset
  resetPassword() {
    if (this.passwordMismatch) {
      this.showModal("Passwords do not match.");
      return;
    }
  
    this.http.post('http://localhost:8080/api/update-password', null, {
      params: { 
        email: this.email, 
        newPassword: this.newPassword 
      },
      responseType: 'text'
    })
    .subscribe({
      next: (response) => {
        this.showModal("Password reset successfully! Please login.");
        this.successMessage = response;
        this.newPassword = '';
        this.confirmPassword = '';
        // Redirect to login after 2 seconds
      },
      error: (error) => {
        this.showModal("Error updating password. Please try again.");
      }
    });
  }

  // Method to show the modal with a message
  showModal(message: string) {
    this.successMessage = message;
    this.isModalVisible = true;
  }

  // Close modal event handler
  onModalOkClick() {
    this.isModalVisible = false;
    this.router.navigate(['/login']); // Redirect to login page
  }
}
