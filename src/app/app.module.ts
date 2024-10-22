import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { DashboardComponent } from './page/operator/dashboard/dashboard.component';
import { LoginComponent } from './page/shared/login/login.component';
import { LunchPlanComponent } from './page/operator/lunch-plan/lunch-plan.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  ionCalendar,
  ionDocumentTextSharp,
  ionHome,
  ionIdCard,
  ionLockClosed,
  ionNotifications,
  ionPerson,
} from '@ng-icons/ionicons';
import { ProfileComponent } from './page/shared/profile/profile.component';
import { HolidayComponent } from './page/admin/holiday/holiday.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StaffComponent } from './page/admin/staff/staff.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionButtonRendererComponent } from './shared/component/action-button-renderer/action-button-renderer.component';
import { EditStaffComponent } from './page/admin/edit-staff/edit-staff.component';
import { AddStaffComponent } from './page/admin/add-staff/add-staff.component';
import { LunchRegistrationComponent } from './lunch/lunch-registration/lunch-registration.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LunchComponent } from './page/admin/lunch/lunch/lunch.component';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    LunchPlanComponent,
    ProfileComponent,
    HolidayComponent,
    AdminLayoutComponent,
    StaffComponent,
    ActionButtonRendererComponent,
    EditStaffComponent,
    AddStaffComponent,
    LunchRegistrationComponent,
    LunchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule,
    HttpClientModule,
    NgIconsModule.withIcons({
      ionHome,
      ionCalendar,
      ionPerson,
      ionDocumentTextSharp,
      ionNotifications,
      ionLockClosed,
      ionIdCard,
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}