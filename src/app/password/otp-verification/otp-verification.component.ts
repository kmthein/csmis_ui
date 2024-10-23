import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http'; // Ensure HttpParams is imported
import { catchError } from 'rxjs/operators'; // Ensure catchError is imported
import { of } from 'rxjs'; // Ensure of is imported

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent implements OnInit {
  email: string = '';
  otpDigits: string[] = ['', '', '', '', '', '']; // Array to hold OTP inputs
  errorMessage: string = '';
  successMessage: string = '';
  timeLeft: number = 60; // Countdown timer in seconds
  interval: any;
  loading: boolean = false; // Loading state to show spinner or disable button

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.email = this.route.snapshot.queryParamMap.get('email') || ''; // Get email from route params
  }

  ngOnInit() {
    this.startCountdown(); // Start OTP countdown timer on initialization
  }

  // Start the countdown timer for OTP expiry
  startCountdown() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.errorMessage = 'OTP has expired. Please request a new one.'; // Error message if OTP expires
      }
    }, 1000);
  }

  // Focus management for OTP input fields
  moveFocus(event: KeyboardEvent, nextInputId: string) {
    const currentInput = event.target as HTMLInputElement;
    
    // Move focus to the next or previous input field based on the key pressed
    if (event.key === 'Backspace' && !currentInput.value) {
      this.focusPreviousInput(nextInputId);
    } else if (event.key.match(/[0-9]/)) {
      this.focusNextInput(nextInputId);
    }
  }

  // // Focus the next input field
  // focusNextInput(nextInputId: string) {
  //   const nextInput = document.querySelector<HTMLInputElement>(
  //     `input[id='${nextInputId}']`
  //   );
  //   if (nextInput) {
  //     nextInput.focus();
  //   }
  // }

  // Focus the previous input field
  focusPreviousInput(currentInputId: string) {
    const currentIndex = parseInt(currentInputId.replace('otp', ''), 10) - 1;
    if (currentIndex > 0) {
      const previousInput = document.querySelector<HTMLInputElement>(
        `input[id='otp${currentIndex}']`
      );
      if (previousInput) {
        previousInput.focus();
      }
    }
  }

  onInputChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
  
    // Allow only numeric input
    if (input.value.match(/[^0-9]/)) {
      input.value = '';
      return; // Stop further processing if non-numeric input is entered
    }
  
    // Store the digit in the array
    this.otpDigits[index] = input.value;
  
    // If a digit is entered and it's not the last input box, move to the next input
    if (input.value && index < 5) {
      this.focusNextInput(`otp${index + 1}`); // Move to the next input
    }
  }
  
  // Move focus to the next input box
  focusNextInput(nextInputId: string) {
    const nextInput = document.querySelector<HTMLInputElement>(`input[id='${nextInputId}']`);
    
    // Make sure the next input exists before focusing
    if (nextInput && nextInput.value === '') {
      nextInput.focus(); // Only focus if the input box is empty to prevent skipping
    }
  }
  

  validateOTP() {
    const otp = this.otpDigits.join('');
    const email = this.email.trim();

    // Clear previous messages
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    const params = new HttpParams().set('email', email).set('otp', otp);

    this.http.post('http://localhost:8080/api/validate-otp', null, { params })
        .subscribe((response: any) => {
            if (response && response.message) { // Check for the message in the response
                this.successMessage = response.message; // Get the message
                this.router.navigate(['/reset-password'], { queryParams: { email } });
            }
            this.loading = false;
        }, (error) => {
            // Handle error response here
            this.errorMessage = error.error.message || 'An error occurred during OTP validation.';
            this.loading = false;
        });
}


}
