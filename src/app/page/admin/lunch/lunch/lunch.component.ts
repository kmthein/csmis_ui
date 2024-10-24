import { Component, OnInit } from '@angular/core';
import { Lunch } from '../../../../models/lunch';
import { LunchService } from '../../../../services/lunch.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']  // Fixed typo here
})
export class LunchComponent implements OnInit {
  lunches: Lunch[] = [];
  selectedLunch: Lunch; // Ensure this is always defined
  isEditing: boolean = false;
  isModalOpen: boolean = false;
  isLoading: boolean = false;

  constructor(private lunchService: LunchService, private router: Router) {
    this.selectedLunch = {
      menu: [],
      price: 0,
      companyRate: 0,
      date: new Date(),
      adminId: undefined,
      restaurantId: undefined
    };
  }

  navigateAddWeeklyMenu() {
    this.router.navigate(['/admin/menu/add-weekly'])
  }


  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  ngOnInit() {
    this.loadLunches();
  }

  loadLunches() {
    this.lunchService.getAllLunches().subscribe(data => {
      this.lunches = data;
    });
  }

  selectLunch(lunch: Lunch) {
    this.selectedLunch = { ...lunch }; // Create a copy for editing
    this.isEditing = true;
  }

  clearSelection() {
    this.selectedLunch = {
      menu: [],
      price: 0,
      companyRate: 0,
      date: new Date(),
      adminId: undefined,
      restaurantId: undefined
    };
    this.isEditing = false;
  }

  saveLunch() {
    if (this.selectedLunch) {
      if (this.isEditing) {
        if (this.selectedLunch.id != null) {
          this.lunchService.updateLunch(this.selectedLunch.id, this.selectedLunch).subscribe(() => {
            this.loadLunches();
            this.clearSelection();
          });
        } else {
          console.error('Selected lunch ID is undefined.');
        }
      } else {
        // Creating a new lunch
        this.lunchService.createLunch(this.selectedLunch).subscribe(
          () => {
            this.loadLunches();
            this.clearSelection();
          },
          error => {
            console.error('Error creating lunch:', error); // Log any errors
          }
        );
      }
    }
  }
  

  deleteLunch(id: number) {
    this.lunchService.deleteLunch(id).subscribe(() => {
      this.loadLunches();
    });
  }
  
}