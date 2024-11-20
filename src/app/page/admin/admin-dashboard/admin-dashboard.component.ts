import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingService } from '../../../services/setting.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  providers: [DatePipe],
})
export class AdminDashboardComponent {
  dueDate: any = 'Monday';
  dueTime: any;
  lastRegisterDay: any;
  lastRegisterTime: any;
  isModalOpen: boolean = false;

  constructor(
    private settingService: SettingService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getSetting();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getSetting() {
    this.settingService.getSettings().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dueDate = response?.lastRegisterDay;
        this.lastRegisterDay = response?.lastRegisterDay;
        this.lastRegisterTime = response?.lastRegisterTime;
        this.dueTime = this.transformTime(response?.lastRegisterTime);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  transformTime(timeString: string): string {
    const date = new Date(`1970-01-01T${timeString}`);
    return this.datePipe.transform(date, 'h:mm a') || '';
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const formData = new FormData();
    const user = JSON.parse(localStorage.getItem("user")!);
    formData.append('adminId', user?.id);
    formData.append('lastRegisterDay', form.value.lastRegisterDay);
    formData.append('lastRegisterTime', form.value.lastRegisterTime);
    this.settingService.updateLastRegister(formData).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.status == '200') {
          this.getSetting();
        }
        this.closeModal();
      },
    });
  }
}
