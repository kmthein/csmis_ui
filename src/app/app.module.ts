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
import { ionCalendar, ionDocumentTextSharp, ionHome, ionNotifications, ionPerson } from '@ng-icons/ionicons';
import { ProfileComponent } from './page/shared/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    LunchPlanComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({
      ionHome, ionCalendar, ionPerson, ionDocumentTextSharp, ionNotifications
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
