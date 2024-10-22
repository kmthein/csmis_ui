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
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StaffComponent } from './page/admin/staff/staff.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionButtonRendererComponent } from './shared/component/action-button-renderer/action-button-renderer.component';
import { EditStaffComponent } from './page/admin/edit-staff/edit-staff.component';
import { AddStaffComponent } from './page/admin/add-staff/add-staff.component';
import { LunchRegistrationComponent } from './lunch/lunch-registration/lunch-registration.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AnnoucementListComponent } from './page/admin/annoucement-list/annoucement-list.component';
import { AnnoucementCardComponent } from './shared/component/annoucement-card/annoucement-card.component';
import { NgxEditorModule } from 'ngx-editor';
import { WeeklyMenuComponent } from './shared/component/weekly-menu/weekly-menu.component';
import { DashboardMenuCardComponent } from './shared/component/dashboard-menu-card/dashboard-menu-card.component';
import { authInterceptor } from './core/interceptor/auth/auth.interceptor';
import { SafeHtmlPipe } from './core/pipe/safe-html.pipe';
import { DateFnsModule } from 'ngx-date-fns';
import { DfnsFormatPipe } from './core/pipe/dfns-format.pipe';
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
    AnnoucementListComponent,
    AnnoucementCardComponent,
    WeeklyMenuComponent,
    DashboardMenuCardComponent,
    SafeHtmlPipe,
    DfnsFormatPipe,
    LunchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    HttpClientModule,
    DateFnsModule,
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
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
        enterValidUrl: 'Please enter a valid URL',
      },
    }),
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}