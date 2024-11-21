import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MeatService } from '../../services/meat.service';
import { Meat } from '../../models/meat';
import { DietaryPreference } from '../../models/DietaryPreference';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dietary-preference',
  templateUrl: './dietary-preference.component.html',
  styleUrls: ['./dietary-preference.component.css']
})
export class DietaryPreferenceComponent implements OnInit {
  userId: number | null = null;
  isVegan: boolean = false;
  meats: Meat[] = [];  // List of available meats
  selectedMeats: number[] = [];  // List of selected meats
  showVeganModal: boolean = false;
  showMeatModal: boolean = false;
  private destroy$ = new Subject<void>(); // For unsubscribing from observables

  constructor(
    private userService: UserService,
    private meatService: MeatService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.id) {
      this.userId = user.id;
      this.loadUserPreferences();
    } else {
      console.error('User not found in local storage!');
    }
    this.loadMeats();
  }

  loadUserPreferences(): void {
    if (this.userId === null) return;
    this.userService.getUserPreferences(this.userId)
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when component is destroyed
      .subscribe({
        next: (preferences) => {
          this.isVegan = preferences.isVegan;
          this.selectedMeats = preferences.meatIds;
        },
        error: (err) => console.error('Error fetching user preferences', err)
      });
  }

  loadMeats(): void {
    this.meatService.getAllMeats()
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when component is destroyed
      .subscribe({
        next: (meats) => this.meats = meats,
        error: (err) => console.error('Error loading meats', err)
      });
  }

  toggleVegan(): void {
    if (this.isVegan) {
      this.selectedMeats = [];  // Clear selected meats if vegan is selected
      this.showMeatModal = false;
    } else {
      this.showMeatModal = true;
    }
  }

  toggleMeatSelection(meatId: number): void {
    const index = this.selectedMeats.indexOf(meatId);
    if (index > -1) {
      this.selectedMeats.splice(index, 1); // Remove meat if already selected
    } else {
      this.selectedMeats.push(meatId); // Add meat if not already selected
    }
  }

  saveDietaryPreferences(): void {
    if (this.userId === null) return;
    
    const preference: DietaryPreference = {
      userId: this.userId,
      isVegan: this.isVegan,
      meatIds: this.selectedMeats
    };

    this.userService.saveDietaryPreference(preference)
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when component is destroyed
      .subscribe({
        next: () => console.log('Dietary preferences updated successfully'),
        error: (err) => console.error('Error updating dietary preferences', err)
      });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
