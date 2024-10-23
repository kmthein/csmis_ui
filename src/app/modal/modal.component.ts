import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() message: string = ''; 
  @Input() isVisible: boolean = false; 
  @Output() okClick = new EventEmitter<void>(); // Event for OK button click

  onOkClick() {
    this.okClick.emit(); // Emit event when OK is clicked
  }
  onCloseClick() {
    this.isVisible = false; // Hide the modal
  }
}
