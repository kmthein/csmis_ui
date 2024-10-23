import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-annoucement-card',
  templateUrl: './annoucement-card.component.html',
  styleUrl: './annoucement-card.component.css',
})
export class AnnoucementCardComponent {
  @Input() announcement: any;
  @Output() selectAnnouncement = new EventEmitter<any>();  

  onCardClick() {
    this.selectAnnouncement.emit(this.announcement);  
    this.selectedDropdown = null;
  }

  selectedDropdown: number | null = null; 

  toggleDropdown(announcementId: number): void {
    if (this.selectedDropdown === announcementId) {
      this.selectedDropdown = null;
    } else {
      this.selectedDropdown = announcementId;
    }
  }

  editor: Editor = new Editor();

  ngOnInit() {
    this.editor = new Editor();
  }

  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
}