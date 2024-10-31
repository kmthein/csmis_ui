import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './page/operator/dashboard/dashboard.component';
import { LunchPlanComponent } from './page/operator/lunch-plan/lunch-plan.component';
import { ProfileComponent } from './page/shared/profile/profile.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HolidayComponent } from './page/admin/holiday/holiday.component';
import { LoginComponent } from './page/shared/login/login.component';
import { StaffComponent } from './page/admin/staff/staff.component';
import { EditStaffComponent } from './page/admin/edit-staff/edit-staff.component';
import { AddStaffComponent } from './page/admin/add-staff/add-staff.component';
import { LunchRegistrationComponent } from './lunch/lunch-registration/lunch-registration.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { LoginGuard } from './core/guard/login.guard';
import { LunchComponent } from './page/admin/lunch/lunch/lunch.component';
import { AnnoucementListComponent } from './page/admin/annoucement-list/annoucement-list.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { OtpVerificationComponent } from './password/otp-verification/otp-verification.component';
import { RestaurantListComponent } from './page/admin/restaurant/restaurant-list/restaurant-list.component';
import { AddRestaurantComponent } from './page/admin/restaurant/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './page/admin/restaurant/edit-restaurant/edit-restaurant.component';
import { AddWeeklyMenuComponent } from './shared/component/add-weekly-menu/add-weekly-menu.component';
import { EditLunchComponent } from './page/admin/edit-lunch/edit-lunch.component';
import { ReportViewerComponent } from './report/report-viewer/report-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'lunch', component: LunchRegistrationComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'announcement', component: AnnoucementListComponent },
      { path: 'announcement/:id', component: AnnoucementListComponent },
      {
        path: 'lunch-menu',
        component: LunchComponent,
      },
      { path: 'reportViewer', component: ReportViewerComponent }
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'holiday', component: HolidayComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'staff/new', component: AddStaffComponent },
      { path: 'staff/edit/:id', component: EditStaffComponent },
      { path: 'announcement', component: AnnoucementListComponent },
      {
        path: 'menu',
        component: LunchComponent,
      },
      { path: 'restaurant', component: RestaurantListComponent },
      { path: 'restaurant/new', component: AddRestaurantComponent },
      { path: 'restaurant/edit/:id', component: EditRestaurantComponent},
      {
        path: 'menu/edit/:id',
        component: EditLunchComponent,
      },
      {
        path: 'menu/add-weekly',
        component: AddWeeklyMenuComponent,
      }
    ],
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
