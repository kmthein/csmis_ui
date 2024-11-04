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
  ionAdd,
  ionAddCircleSharp,
  ionAddOutline,
  ionCalendar,
  ionCreateOutline,
  ionDocumentTextSharp,
  ionFastFood,
  ionHome,
  ionIdCard,
  ionLockClosed,
  ionMegaphone,
  ionNotifications,
  ionPerson,
  ionTrash,
  ionTrashBin,
  ionRestaurant,
  ionEnterOutline,
  ionAddSharp,
  ionCalendarNumberOutline,
  ionTodayOutline,
  ionSettings,
  ionArrowDownRightBoxOutline,
  ionCreate,
  ionCreateSharp,
} from '@ng-icons/ionicons';
import { ProfileComponent } from './page/shared/profile/profile.component';
import { HolidayComponent } from './page/admin/holiday/holiday.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
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
import { SafeHtmlPipe } from './core/pipe/safe-html.pipe';
import { DateFnsModule } from 'ngx-date-fns';
import { DfnsFormatPipe } from './core/pipe/dfns-format.pipe';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat'; // Import AngularFireModule
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { PdfUploaderComponent } from './page/shared/pdf-uploader/pdf-uploader.component';
import { LunchComponent } from './page/admin/lunch/lunch/lunch.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { OtpVerificationComponent } from './password/otp-verification/otp-verification.component';
import { authInterceptor } from './core/interceptor/auth/auth.interceptor';
import { AvoidMeatComponent } from './meal/avoid-meat/avoid-meat.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmationModalComponent } from './shared/component/confirmation-modal/confirmation-modal.component';
import { AddRestaurantComponent } from './page/admin/restaurant/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './page/admin/restaurant/edit-restaurant/edit-restaurant.component';
import { RestaurantListComponent } from './page/admin/restaurant/restaurant-list/restaurant-list.component';
import { AddWeeklyMenuComponent } from './shared/component/add-weekly-menu/add-weekly-menu.component';
import { EditLunchComponent } from './page/admin/edit-lunch/edit-lunch.component';
import { ReportViewerComponent } from './report/report-viewer/report-viewer.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { MailOnUserComponent } from './report/mail-on-user/mail-on-user.component';
import { AdminDashboardComponent } from './page/admin/admin-dashboard/admin-dashboard.component';

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
    PdfUploaderComponent,
    LunchComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    OtpVerificationComponent,
    AvoidMeatComponent,
    ModalComponent,
    ConfirmationModalComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    RestaurantListComponent,
    AddWeeklyMenuComponent,
    EditLunchComponent,
    LunchComponent,
    ReportViewerComponent,
    SafeUrlPipe,
    MailOnUserComponent,
    AdminDashboardComponent,
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
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialize Firebase
    AngularFireStorageModule,
    NgxDocViewerModule,
    NgIconsModule.withIcons({
      ionHome,
      ionCalendar,
      ionPerson,
      ionDocumentTextSharp,
      ionNotifications,
      ionLockClosed,
      ionIdCard,
      ionTrashBin,
      ionMegaphone,
      ionCreateOutline,
      ionTrash,
      ionRestaurant,
      ionAddOutline,
      ionAddSharp,
      ionFastFood,
      ionEnterOutline,
      ionCalendarNumberOutline,
      ionTodayOutline,
      ionSettings,
      ionArrowDownRightBoxOutline,
      ionCreate,
      ionCreateSharp
    }),
    BrowserAnimationsModule,
    NgxDocViewerModule,
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
