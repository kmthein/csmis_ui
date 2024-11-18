import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
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
  hoveredIndex: any = null;
  deleteFileIds: any = [];
  previewFiles: any = [];
  isConfirmOpen: boolean = false;
  selectedAnnouncementId: number | null = null;

  constructor(
    private authService: AuthService,
    private announceService: AnnouncementService,
    private storage: AngularFireStorage,
    private renderer: Renderer2
  ) {}

  toggleConfirmModal(show: boolean, id: number | null = null) {
    this.isConfirmOpen = show;
    this.selectedAnnouncementId = id;
  }

  confirmDelete() {
    if (this.selectedAnnouncementId) {
      console.log('Delete announcement with ID:', this.selectedAnnouncementId);
      this.announceService.deleteAnnouncement(this.selectedAnnouncementId).subscribe({
        next: (response) => {
          if(response.message) {
            this.getAllAnnouncement();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
    this.toggleConfirmModal(false);
  }

  onSelectAnnouncement(announcement: any) {
    this.selectedAnnouncement = announcement;
    this.previewFiles = announcement?.files;
    this.title = announcement.title;
    this.editorContent = announcement.content;
    console.log(this.selectedAnnouncement);
    this.editMode = true;
    this.deleteFileIds = [];
    this.toggleModal(true);
  }

  toggleModal(editMode: boolean) {
    this.isModalOpen = !this.isModalOpen;
    if (!editMode) {
      this.title = '';
      this.editorContent = '';
      this.editMode = false;
    }
    if (this.isModalOpen) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
    initFlowbite();
  }

  html = 'Hello world!';
  editor: Editor = new Editor();

  getAllAnnouncement() {
    this.announceService.getAllAnnouncements().subscribe((data) => {
      console.log(data);
      this.announcements = data;
    });
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

  selectedFiles: File[] = [];
  renamedFiles: File[] = [];

  deleteFile(id: number) {
    this.deleteFileIds.push(id);
    console.log(this.deleteFileIds);
    const newPreview = this.previewFiles.filter((file: any) => file.id != id);
    this.previewFiles = newPreview;
    console.log(this.previewFiles);
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  uploadFiles() {
    const uploadPromises = this.selectedFiles.map((file) =>
      this.uploadFile(file)
    );
    Promise.all(uploadPromises)
      .then((renamedFiles) => {
        const id = this.user?.id;
        if (this.editMode) {
          this.announceService
            .updateAnnouncement(
              this.selectedAnnouncement?.id,
              this.title,
              this.editorContent,
              renamedFiles,
              id!,
              this.deleteFileIds
            )
            .subscribe({
              next: (response) => {
                if (response.message) {
                  this.getAllAnnouncement();
                  this.isLoading = false;
                  this.toggleModal(false);
                  this.title = '';
                  this.editorContent = '';
                  this.selectedAnnouncement = null;
                  this.deleteFileIds = [];
                  this.editMode = false;
                  this.previewFiles = [];
                  this.selectedFiles = [];
                }
              },
              error: (error) => {
                console.error(error);
              },
            });
        } else {
          this.announceService
            .addNewAnnouncement(
              this.title,
              this.editorContent,
              renamedFiles,
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
        }
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  }

  uploadFile(file: File): Promise<File> {
    const filePath = `${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Promise((resolve, reject) => {
      task.percentageChanges().subscribe((progress) => {
        this.uploadProgress = progress;
      });

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(
              (url) => {
                console.log(url);
                const renamedFile = this.renameFile(file, url);
                this.renamedFiles.push(renamedFile);
                resolve(renamedFile);
              },
              (error) => reject(error)
            );
          })
        )
        .subscribe();
    });
  }

  renameFile(originalFile: File, newFileName: string): File {
    const renamedFile = new File([originalFile], newFileName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
    return renamedFile;
  }

  onSubmit() {
    this.isLoading = true;
    this.uploadFiles();
  }
}
