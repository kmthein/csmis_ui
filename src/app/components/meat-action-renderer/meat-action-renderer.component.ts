import { Component } from '@angular/core';

@Component({
  selector: 'app-meat-action-renderer',
  templateUrl: './meat-action-renderer.component.html',
  styleUrl: './meat-action-renderer.component.css'
})
export class MeatActionRendererComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onEdit() {
    if (this.params?.context?.componentParent) {
      this.params.context.componentParent.onEditMeat(this.params.data);
    } else {
      console.error('componentParent is undefined');
    }
  }

  onDelete() {
    if (this.params?.context?.componentParent) {
      this.params.context.componentParent.onDeleteMeat(this.params.data.id);
    } else {
      console.error('componentParent is undefined');
    }
  }
}
