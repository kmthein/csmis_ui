import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './page/operator/dashboard/dashboard.component';
import { LunchPlanComponent } from './page/operator/lunch-plan/lunch-plan.component';
import { ProfileComponent } from './page/shared/profile/profile.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HolidayComponent } from './page/admin/holiday/holiday.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'lunch', component: LunchPlanComponent },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
