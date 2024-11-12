import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingService } from '../../../services/setting.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  price: number = 0;
  rate: number = 50;
  initialRate: number = 0;
  lunchReminder: string = "10:00";
  dueDate: any = 'Monday';
  dueTime: any;
  lastRegisterDay: any;
  lastRegisterTime: any;
  isModalOpen: boolean = false;
  viewMode: boolean = true;

  constructor(private settingService: SettingService, private datePipe: DatePipe, private toast: ToastrService) {}

  ngOnInit() {
    this.getSetting();
  }

  getSetting() {
    this.settingService.getSettings().subscribe({
      next: (response: any) => {
        console.log(response);
        this.price = response?.currentLunchPrice;
        this.rate = response?.companyRate;
        this.initialRate = response?.companyRate;
        this.lunchReminder = response?.lunchReminderTime;
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
    this.initialRate = form.value.rate;
    console.log(form.value);
    this.viewMode = true;
    const formData = new FormData();
    const user = JSON.parse(localStorage.getItem("user")!);
    formData.append("adminId", user?.id);
    formData.append("companyRate", form.value.rate);
    formData.append("lunchReminderTime", form.value.lunchReminder);
    formData.append("currentLunchPrice", form.value.price);
    this.settingService.updateSettings(formData).subscribe({
      next: response => {
        console.log(response);
        if(response.status == "200") {
          this.toast.success(response.message);
        } else {
          this.toast.error(response.message);
        }
        this.viewMode = true;
      }
    });
  }

  toggleViewMode(bool: boolean) {
    this.viewMode = bool;
    if(bool) {
      this.rate = this.initialRate;
    }
  }
}
