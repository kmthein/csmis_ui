import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() message: string = ''; 
  @Input() isVisible: boolean = false; 
  @Output() okClick = new EventEmitter<void>(); 

  onOkClick() {
    this.okClick.emit(); 
  }
  onCloseClick() {
    this.isVisible = false; 
  }
}
