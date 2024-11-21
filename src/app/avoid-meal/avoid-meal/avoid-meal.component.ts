import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MeatService } from '../../services/meat.service';
import { Meat } from '../../models/meat';
import { DietaryPreference } from '../../models/DietaryPreference';

@Component({
  selector: 'app-dietary-preference',
  templateUrl: './dietary-preference.component.html',
  styleUrls: ['./dietary-preference.component.css']
})
export class DietaryPreferenceComponent implements OnInit {
  userId: number | null = null;
  isVegan: boolean = false;
  meatOptions: Meat[] = [];  // List of available meats
  avoidMeats: number[] = [];  // List of meats to avoid (from database)

  constructor(
    private userService: UserService,
    private meatService: MeatService
  ) {}

  ngOnInit(): void {
    // Retrieve user info from local storage
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.id) {
      this.userId = user.id;
      this.loadUserPreferences();  // Load user preferences (whether vegan or not)
    } else {
      console.error('User not found in local storage!');
    }
    this.loadMeats();  // Load available meat options
  }

  loadUserPreferences(): void {
    if (this.userId !== null) {
      this.userService.getUserPreferences(this.userId).subscribe((preferences) => {
        this.isVegan = preferences.isVegan;  // Whether the user is vegan
        this.avoidMeats = preferences.meatIds;  // List of meats the user wants to avoid

        // If the user is vegan, auto-clear the selected meats
        if (this.isVegan) {
          this.avoidMeats = [];  // No meat should be selected if vegan
        }
      });
    }
  }

  loadMeats(): void {
    this.meatService.getAllMeats().subscribe((meats) => {
      this.meatOptions = meats;
    });
  }

  toggleVegan(): void {
    this.isVegan = !this.isVegan;
    // If toggled to vegan, reset avoidMeats to empty (no meats selected)
    if (this.isVegan) {
      this.avoidMeats = [];
    }
  }

  updateMeatSelection(meat: Meat): void {
    const index = this.avoidMeats.indexOf(meat.id);
    if (index > -1) {
      this.avoidMeats.splice(index, 1);  // Remove meat from selection
    } else {
      this.avoidMeats.push(meat.id);  // Add meat to selection
    }
  }

  saveDietaryPreferences(): void {
    const preference: DietaryPreference = {
      userId: this.userId!,
      isVegan: this.isVegan,
      meatIds: this.avoidMeats,  // Save the selected meat IDs
    };

    this.userService.saveDietaryPreference(preference).subscribe({
      next: () => console.log('Dietary preferences updated successfully'),
      error: (err) => console.error('Error updating dietary preferences', err),
    });
  }
}
