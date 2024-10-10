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

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'lunch', component: LunchRegistrationComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'holiday', component: HolidayComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'staff/new', component: AddStaffComponent },
      { path: 'staff/edit/:id', component: EditStaffComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
