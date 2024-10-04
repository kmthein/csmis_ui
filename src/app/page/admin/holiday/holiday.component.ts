import { Component } from '@angular/core';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent {
  isModalOpen = false;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

}
