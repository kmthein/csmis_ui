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
import { MailOnUserComponent } from './report/mail-on-user/mail-on-user.component';
import { AdminDashboardComponent } from './page/admin/admin-dashboard/admin-dashboard.component';
import { ForcePasswordChangeComponent } from './password/force-password-change/force-password-change.component';
import { DoorAccessRecordComponent } from './page/admin/door-access-record/door-access-record.component';
import { SuggestionCreateComponent } from './components/suggestion/suggestion-create/suggestion-create.component';
import { MeatListComponent } from './meat/meat-list/meat-list.component';
import { SettingComponent } from './page/admin/setting/setting.component';
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
import { TotalYearlyPaymentComponent } from './payments/total-yearly-payment/total-yearly-payment.component';
import { TotalMonthlyPaymentComponent } from './payments/total-monthly-payment/total-monthly-payment.component';
import { SuggestDetailsComponent } from './page/admin/suggest-details/suggest-details.component';
import { SuggestListComponent } from './page/admin/suggest-list/suggest-list.component';
import { AllNotificationsComponent } from './page/shared/all-notifications/all-notifications.component';
import { AnnouncementDetailsComponent } from './page/shared/announcement-details/announcement-details.component';
import { PaymentVoucherComponent } from './payments/payment-voucher/payment-voucher.component';
import { StaffLunchRecordComponent } from './report/staff-lunch-record/staff-lunch-record.component';
import { UserAvoidRecordComponent } from './report/user-avoid-record/user-avoid-record.component';
import { OrderCreateComponent } from './components/order/order-create/order-create.component';
import { VoucherListComponent } from './page/admin/voucher-list/voucher-list.component';
import { EditVoucherComponent } from './page/admin/edit-voucher/edit-voucher.component';
import { FeedbackListComponent } from './components/feedback/feedback-list/feedback-list.component';

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
      { path: 'announcement/:id', component: AnnouncementDetailsComponent },
      { path: 'notifications/all', component: AllNotificationsComponent },
      { path: 'avoid', component: DietaryPreferenceComponent },
      {
        path: 'lunch-menu',
        component: LunchComponent,
      },
      { path: 'reportViewer', component: ReportViewerComponent },
      { path: 'suggest', component: SuggestionCreateComponent },
      { path: 'feedback', component: FeedbackFormComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'holiday', component: HolidayComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'staff/new', component: AddStaffComponent },
      { path: 'staff/edit/:id', component: EditStaffComponent },
      { path: 'announcement', component: AnnoucementListComponent },
      { path: 'announcement/:id', component: AnnoucementListComponent },
      {
        path: 'menu',
        component: LunchComponent,
      },
      { path: 'restaurant', component: RestaurantListComponent },
      { path: 'restaurant/new', component: AddRestaurantComponent },
      { path: 'restaurant/edit/:id', component: EditRestaurantComponent },
      { path: 'doorlogs', component: DoorAccessRecordComponent },
      {
        path: 'menu/edit/:id',
        component: EditLunchComponent,
      },
      {
        path: 'menu/add-weekly',
        component: AddWeeklyMenuComponent,
      },
      { path: 'meats', component: MeatListComponent },
      { path: 'report/lunch-summary', component: LunchSummaryComponent },
      { path: 'settings', component: SettingComponent },
      { path: 'report/mail-on', component: MailOnUserComponent },
      { path: 'report/lunch-summary', component: LunchSummaryComponent },
      { path: 'report/department-cost', component: DepartmentCostComponent },
      { path: 'report/staff-lunch', component: StaffLunchRecordComponent },
      { path: 'report/user-avoid', component: UserAvoidRecordComponent },
      { path: 'weekly', component: WeeklyPaymentComponent },

      { path: 'monthly', component: MonthlyPaymentComponent },
      { path: 'Company_monthly', component: CompanyMonthlyPaymentComponent },
      { path: 'Totalmonthly', component: TotalMonthlyPaymentComponent },

      { path: 'yearly', component: YearlyPaymentComponent },
      { path: 'Company_yearly', component: CompanyYearlyPaymentComponent },

      { path: 'Company_weekly', component: CompanyweeklyPaymentComponent },
      { path: 'voucher', component: VoucherListComponent },
      { path: 'voucher/new', component: PaymentVoucherComponent },
      { path: 'voucher/edit/:id', component: EditVoucherComponent },
      { path: 'order', component: OrderCreateComponent },
      { path: 'payment', component: ViewPaymentComponent },
      { path: 'TotalWeekly', component: TotalWeeklyPaymentComponent },
      { path: 'TotalYearly', component: TotalYearlyPaymentComponent },
      { path: 'suggestions/:id', component: SuggestDetailsComponent },
      { path: 'feedbacks', component: FeedbackListComponent },
      { path: 'notifications/all', component: SuggestListComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  { path: 'force-password/change', component: ForcePasswordChangeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
