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

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    LunchPlanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
