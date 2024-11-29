import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Meat } from '../../models/meat';
import { MeatService } from '../../services/meat.service';
import { Modal } from 'bootstrap';
import { ActionButtonRendererComponent } from '../../shared/component/action-button-renderer/action-button-renderer.component';
import { ToastrService } from 'ngx-toastr';
import { MeatActionRendererComponent } from '../../components/meat-action-renderer/meat-action-renderer.component';

@Component({
  selector: 'app-meat-list',
  templateUrl: './meat-list.component.html',
  styleUrls: ['./meat-list.component.css'],
})
export class MeatListComponent implements OnInit {
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [10, 20, 30];

  colDefs: any = [
    {
      valueGetter: (params: any) => params.node.rowIndex + 1,
      flex: 0.5,
    },
    { field: 'name', headerName: 'Name', flex: 1.5, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: MeatActionRendererComponent,
      flex: 0.8,
    },
  ];

  gridOptions = {
    context: {
      componentParent: this, // Reference to the parent component
    },
  };

  isModalOpen: boolean = false;
  isLoading: boolean = false;

  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  meats: Meat[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  selectedMeat: Meat = { id: 0, name: '' };
  isEditMode: boolean = false; // New property to toggle between edit and create mode

  constructor(
    private meatService: MeatService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMeats();
  }

  loadMeats(): void {
    this.meatService.getAllMeats().subscribe({
      next: (meats) => (this.meats = meats),
      error: (err) => (this.errorMessage = 'Failed to load meats'),
    });
  }

  onCreateMeat(): void {
    this.isEditMode = false;
    this.selectedMeat = { id: 0, name: '' }; // Reset selectedMeat
    this.isModalOpen = true;
  }

  onEditMeat(meat: Meat): void {
    this.isEditMode = true;
    this.selectedMeat = { ...meat };
    this.isModalOpen = true;
  }

  saveMeat(): void {
    const existingMeat = this.meats.find(
      (m) => m.name === this.selectedMeat.name && m.id !== this.selectedMeat.id
    );
    if (existingMeat) {
      this.toastService.error(
        'A meat with this name already exists. Please choose a different name.'
      );
      return;
    }

    if (this.isEditMode) {
      this.meatService
        .updateMeat(this.selectedMeat.id, this.selectedMeat)
        .subscribe({
          next: (updatedMeat) => {
            const index = this.meats.findIndex((m) => m.id === updatedMeat.id);
            if (index !== -1) this.meats[index] = updatedMeat;
            this.successMessage = 'Meat updated successfully!';
            this.toastService.success(this.successMessage);
            this.closeModal();
            this.loadMeats();
          },
          error: () => this.toastService.error('A meat with this name already exists. Please choose a different name.'),
        });
    } else {
      this.meatService.createMeat(this.selectedMeat).subscribe({
        next: (newMeat) => {
          this.meats.push(newMeat);
          this.successMessage = 'Meat created successfully!';
          this.toastService.success(this.successMessage);
          this.closeModal();
          this.loadMeats();
        },
        error: () => this.toastService.error('Failed to create meat.'),
      });
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  clearMessages(): void {
    setTimeout(() => (this.successMessage = null), 3000);
  }

  onDeleteMeat(id: number): void {
    this.meatService.deleteMeat(id).subscribe({
      next: () => this.loadMeats(),
      error: () => this.toastService.error('Failed to delete meat.'),
    });
  }
}
