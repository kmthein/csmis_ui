import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Editor, Toolbar, Validators } from 'ngx-editor';

@Component({
  selector: 'app-annoucement-list',
  templateUrl: './annoucement-list.component.html',
  styleUrl: './annoucement-list.component.css',
})
export class AnnoucementListComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  isModalOpen: boolean = false;
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    initFlowbite();
  }

  html = 'Hello world!';
  editor: Editor = new Editor();
  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  getEditorContent() {
    const content = this.form.get('editorContent')?.value;
    console.log('Current Editor Content:', content);
    return content;
  }

  // Example method for form submission
  onSubmit() {
    const content = this.getEditorContent();
    console.log(content);

    // handle the content, e.g., send to a server
  }
}
