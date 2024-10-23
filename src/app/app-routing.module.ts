import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './page/operator/dashboard/dashboard.component';
import { LunchPlanComponent } from './page/operator/lunch-plan/lunch-plan.component';
import { ProfileComponent } from './page/shared/profile/profile.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HolidayComponent } from './page/admin/holiday/holiday.component';
import { LoginComponent } from './page/shared/login/login.component';
import { LunchRegistrationComponent } from './lunch/lunch-registration/lunch-registration.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { OtpVerificationComponent } from './password/otp-verification/otp-verification.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'lunch', component: LunchRegistrationComponent },
      { path: 'profile', component: ProfileComponent },
      

      
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'holiday', component: HolidayComponent },
      
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'otp-verification', component: OtpVerificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
