import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Meat } from '../../models/meat';
import { MeatService } from '../../services/meat.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-meat-list',
  templateUrl: './meat-list.component.html',
  styleUrls: ['./meat-list.component.css']
})
export class MeatListComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  meats: Meat[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  selectedMeat: Meat = { id: 0, name: '' };
  isEditMode: boolean = false; // New property to toggle between edit and create mode

  constructor(private meatService: MeatService) {}

  ngOnInit(): void {
    this.loadMeats();
  }

  loadMeats(): void {
    this.meatService.getAllMeats().subscribe({
      next: (meats) => (this.meats = meats),
      error: (err) => (this.errorMessage = 'Failed to load meats')
    });
  }

  onCreateMeat(): void {
    this.isEditMode = false;
    this.selectedMeat = { id: 0, name: '' }; // Reset selectedMeat
    const modalElement = document.getElementById('editMeatModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  onEditMeat(meat: Meat): void {
    this.isEditMode = true;
    this.selectedMeat = { ...meat };
    const modalElement = document.getElementById('editMeatModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  saveMeat(): void {
    const existingMeat = this.meats.find(m => m.name === this.selectedMeat.name && m.id !== this.selectedMeat.id);
    if (existingMeat) {
      alert('A meat with this name already exists. Please choose a different name.');
      return;
    }

    if (this.isEditMode) {
      this.meatService.updateMeat(this.selectedMeat.id, this.selectedMeat).subscribe({
        next: (updatedMeat) => {
          const index = this.meats.findIndex(m => m.id === updatedMeat.id);
          if (index !== -1) this.meats[index] = updatedMeat;
          this.successMessage = 'Meat updated successfully!';
          setTimeout(() => {
            this.closeModal();
            this.clearMessages();
          }, 2000);
        },
        error: () => alert('Failed to update meat.')
      });
    } else {
      this.meatService.createMeat(this.selectedMeat).subscribe({
        next: (newMeat) => {
          this.meats.push(newMeat);
          this.successMessage = 'Meat created successfully!';
          setTimeout(() => {
            this.closeModal();
            this.clearMessages();
          }, 2000);
        },
        error: () => alert('Failed to create meat.')
      });
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('editMeatModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
  }

  clearMessages(): void {
    setTimeout(() => (this.successMessage = null), 3000);
  }

  onDeleteMeat(id: number): void {
    this.meatService.deleteMeat(id).subscribe({
      next: () => this.loadMeats(),
      error: () => alert('Failed to delete meat.')
    });
  }
}
