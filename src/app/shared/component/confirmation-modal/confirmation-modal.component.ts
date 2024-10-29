import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Input() content = "";

  // Emit confirm event
  onConfirm() {
    this.confirm.emit();
  }

  // Emit cancel event
  onCancel() {
    this.cancel.emit();
  }
}
