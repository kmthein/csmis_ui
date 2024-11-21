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
  ionCardOutline,
  ionCard,
  ionArrowDownRightBoxOutline,
  ionCreate,
  ionCreateSharp,
  ionArrowBack,
  ionReturnDownBackSharp,
  ionReturnUpBackOutline,
  ionBuild,
  ionSearch,
  ionCash,
  ionCash,
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
import { DoorAccessRecordComponent } from './page/admin/door-access-record/door-access-record.component';
import { AdminDashboardComponent } from './page/admin/admin-dashboard/admin-dashboard.component';
import { ForcePasswordChangeComponent } from './password/force-password-change/force-password-change.component';
import { SuggestionCreateComponent } from './components/suggestion/suggestion-create/suggestion-create.component';
import { NotiComponent } from './noti/noti.component';
import { MeatListComponent } from './meat/meat-list/meat-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingComponent } from './page/admin/setting/setting.component';
import { DatePipe } from '@angular/common';
import { LunchSummaryPieComponent } from './components/chart/lunch-summary-pie/lunch-summary-pie.component';
import { AgChartsModule } from 'ag-charts-angular';
import { LunchSummaryComponent } from './report/lunch-summary/lunch-summary.component';
import { FeedbackFormComponent } from './components/feedback/feedback-form/feedback-form.component';
import { CreateVoucherComponent } from './components/payment-voucher/create-voucher/create-voucher.component';
import { DepartmentCostComponent } from './report/department-cost/department-cost.component';
import { DietaryPreferenceComponent } from './avoid-meal/dietary-preference/dietary-preference.component';
import { WeeklyPaymentComponent } from './payments/weekly-payment/weekly-payment.component';
import { MonthlyPaymentComponent } from './payments/monthly-payment/monthly-payment.component';
import { YearlyPaymentComponent } from './payments/yearly-payment/yearly-payment.component';
import { CompanyweeklyPaymentComponent } from './payments/companyweekly-payment/companyweekly-payment.component';
import { CompanyMonthlyPaymentComponent } from './payments/company-monthly-payment/company-monthly-payment.component';
import { CompanyYearlyPaymentComponent } from './payments/company-yearly-payment/company-yearly-payment.component';
import { ViewPaymentComponent } from './payments/view-payment/view-payment.component';
import { TotalWeeklyPaymentComponent } from './payments/total-weekly-payment/total-weekly-payment.component';
import { TotalMonthlyPaymentComponent } from './payments/total-monthly-payment/total-monthly-payment.component';
import { TotalYearlyPaymentComponent } from './payments/total-yearly-payment/total-yearly-payment.component';

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
    DoorAccessRecordComponent,
    AdminDashboardComponent,
    ForcePasswordChangeComponent,
    SuggestionCreateComponent,
    NotiComponent,
    ModalComponent,
    MeatListComponent,
    SettingComponent,
    LunchSummaryPieComponent,
    LunchSummaryComponent,
    FeedbackFormComponent,
    CreateVoucherComponent,
    DepartmentCostComponent,
    DietaryPreferenceComponent,
    WeeklyPaymentComponent,
    MonthlyPaymentComponent,
    YearlyPaymentComponent,
    CompanyweeklyPaymentComponent,
    CompanyMonthlyPaymentComponent,
    CompanyYearlyPaymentComponent,
    ViewPaymentComponent,
    TotalWeeklyPaymentComponent,
    TotalMonthlyPaymentComponent,
    TotalYearlyPaymentComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    AgChartsModule,
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
      ionCard,
      ionArrowDownRightBoxOutline,
      ionCreate,
      ionCreateSharp,
      ionArrowBack,
      ionReturnUpBackOutline,
      ionBuild,
      ionSearch,
      ionCash,
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
  providers: [provideHttpClient(withInterceptors([authInterceptor])), DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
