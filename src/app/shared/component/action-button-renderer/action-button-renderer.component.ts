import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminActionService } from '../../../services/admin-action.service';

@Component({
  selector: 'app-action-button-renderer',
  templateUrl: './action-button-renderer.component.html',
  styleUrl: './action-button-renderer.component.css',
})
export class ActionButtonRendererComponent {
  params: any;
  type: any;

  @Output() edit = new EventEmitter<any>();

  agInit(params: any): void {
    this.params = params;
    this.type = params.type;
  }

  constructor(
    private router: Router,
    private adminService: AdminActionService
  ) {}

  onEdit() {
    const paramsData = this.params.data;
    const type = this.params.type;
    this.router.navigate([`admin/${type}/edit/`, paramsData.id]);
  }

  onDelete() {
    const paramsData = this.params.data;
    const type = this.params.type;
    this.adminService.deleteByType(type, paramsData.id).subscribe({
      next: () => {
        if (this.params.getAllHolidays) {
          this.params.getAllHolidays();
        } else if (this.params.loadLunches) {
          this.params.loadLunches();
        } else if (this.params.getAllRestaurants) {
          this.params.getAllRestaurants();
        }
      },
      error: () => console.log('Failed to delete.'),
    });
  }
}
