import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { AnnoucementService } from '../../../services/annoucement/annoucement.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

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
  uploadProgress: number | undefined;
  downloadURL: string | undefined;
  selectedAnnouncement: any;  
  editMode: boolean = false;

  constructor(
    private authService: AuthService,
    private announceService: AnnoucementService,
    private storage: AngularFireStorage
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSelectAnnouncement(announcement: any) {
    this.selectedAnnouncement = announcement;
    this.title = announcement.title;
    this.editorContent = announcement.content;
    console.log(this.selectedAnnouncement);
    this.editMode = true;
    this.toggleModal(true);
  }

  toggleModal(editMode: boolean) {
    this.isModalOpen = !this.isModalOpen;
    if(!editMode) {
      this.title = '';
      this.editorContent = '';
      this.editMode = false;
    }
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

  uploadFile(input: any) {
    const file = input;
    const filePath = `${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Monitor upload progress
    task.percentageChanges().subscribe(progress => {
      this.uploadProgress = progress;
    });

    const id = this.user?.id;

    // Get download URL after successful upload
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL = url;  // This is the viewable URL
          this.selectedFile = this.renameFile(this.selectedFile!, this.downloadURL!);
          console.log('File available at:', this.downloadURL);
          console.log(this.selectedFile);
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
            this.toggleModal(false);
            this.title = '';
            this.editorContent = '';
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
        });
      })
    ).subscribe();
  }

  renameFile(originalFile: File, newFileName: string): File {
    // Create a new file with the same content, type, and modified name
    const renamedFile = new File([originalFile], newFileName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
    
    return renamedFile;
  }

  onSubmit() {
    this.uploadFile(this.selectedFile);
  }
}
