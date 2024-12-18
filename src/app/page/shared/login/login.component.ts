import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  staffId: string = '';
  password: string = '';
  isLoading: boolean = false;
  @Output() userLogged = new EventEmitter<User>();

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const { staffId, password } = form.value;
    this.authService.login(staffId, password).subscribe({
      next: (response) => {
        console.log(response);
        if (response.token) {
          this.userLogged.emit(response.userDetails);
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        }
        this.isLoading = false;
      },
    });
  }
}
