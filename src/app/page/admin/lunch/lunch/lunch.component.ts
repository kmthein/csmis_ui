import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']  // Fixed typo here
})
export class LunchComponent {
  isModalOpen = false;
  lunch = {
    date: '',
    price: 0,
    companyRate: 0,
    menu: [''] // Initialize with at least one menu item
  };

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  addMenuItem() {
    this.lunch.menu.push('');
  }

  removeMenuItem(index: number) {
    this.lunch.menu.splice(index, 1);
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', this.lunch);
      // Handle form submission logic
    }
  }
}