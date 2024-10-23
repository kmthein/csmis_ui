import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'] // Ensure you have the corresponding CSS file
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = ''; // For success messages
  isLoading: boolean = false; // Loading state to show spinner or loading message

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const apiUrl = 'http://localhost:8080/api/forgot-password';
    this.isLoading = true;
    this.errorMessage = ''; // Clear previous error messages
    this.successMessage = ''; // Clear previous success messages

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailPattern.test(this.email)) {
      this.isLoading = false;
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.http.post(apiUrl, { email: this.email }, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('OTP sent successfully', response);
          this.isLoading = false;
          this.successMessage = 'OTP sent successfully! Check your email for the OTP.'; // Set success message
          this.router.navigate(['/otp-verification'], { queryParams: { email: this.email } });
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 400) {
            console.error('Bad Request: Please check the email format');
            this.errorMessage = 'Bad Request: Please check the email format';
          } else {
            console.error('Error sending OTP', error);
            this.errorMessage = 'Error sending OTP. Please try again.';
          }
        }
      });
  }
}
