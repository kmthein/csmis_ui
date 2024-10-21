import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { AnnoucementService } from '../../../services/annoucement/annoucement.service';

@Component({
  selector: 'app-annoucement-list',
  templateUrl: './annoucement-list.component.html',
  styleUrl: './annoucement-list.component.css',
})
export class AnnoucementListComponent implements OnInit, OnDestroy {
  announcements: any = [];
  isLoading: boolean = false;
  isModalOpen: boolean = false;
  selectedFile: File | null = null;
  user: User | undefined | null;

  title: string = '';
  editorContent: string = '';

  constructor(
    private authService: AuthService,
    private announceService: AnnoucementService
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    initFlowbite();
  }

  html = 'Hello world!';
  editor: Editor = new Editor();

  getAllAnnouncement() {
    this.announceService.getAllAnnouncements().subscribe((data) => {
      console.log(data);
      this.announcements = data;
    })
  }

  ngOnInit(): void {
    this.getAllAnnouncement();
    this.editor = new Editor();
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
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

  onSubmit() {
    const id = this.user?.id;
    this.announceService
      .addNewAnnouncement(
        this.title,
        this.editorContent,
        this.selectedFile!,
        id!
      )
      .subscribe({
        next: (response) => {
          if (response.message) {
            this.getAllAnnouncement();
            this.isLoading = false;
            this.toggleModal();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
