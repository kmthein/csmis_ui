import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-action-button-renderer',
  templateUrl: './action-button-renderer.component.html',
  styleUrl: './action-button-renderer.component.css'
})
export class ActionButtonRendererComponent {
  params: any;

  @Output() edit = new EventEmitter<any>();

  agInit(params: any): void {
    this.params = params;
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  onEdit() {
    const paramsData = this.params.data;
    const type = this.params.type;
    this.router.navigate([`admin/${type}/edit/`, paramsData.id]);
  }


  onDelete() {
    alert('Delete action for ' + this.params.data.name);
  }
}
