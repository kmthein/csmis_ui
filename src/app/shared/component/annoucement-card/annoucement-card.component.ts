import { Component, Input } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-annoucement-card',
  templateUrl: './annoucement-card.component.html',
  styleUrl: './annoucement-card.component.css',
})
export class AnnoucementCardComponent {
  @Input() announcement: any;
  file = 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf';

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
