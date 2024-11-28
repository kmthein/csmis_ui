import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  viewMode: boolean = true;
  user: any = {};
  showOverlay: boolean = false;
  previewImg: any = null;
  uploadProgress: number | undefined;
  downloadURL: string | undefined;
  selectedFile!: File;
  url!: string;

  setOverlay(bool: boolean) {
    this.showOverlay = bool;
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector<any>('#fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      this.previewImg = URL.createObjectURL(file);
      console.log('Selected file:', file);
      // Handle the file (e.g., upload to server, display preview, etc.)
    }
  }

  saveProfileImage() {
    console.log("click");    
    this.uploadFile(this.selectedFile);
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
                this.url = url;
                const form = new FormData();
                form.append("userId", this.user?.id);
                form.append("imgUrl", this.url);
                this.userService.updateUserProfile(form).subscribe(res => {
                  if(res.status == "200") {
                    this.url = "";
                    this.previewImg = null;
                    this.getUserById();
                  }
                });
              },
              (error) => reject(error)
            );
          })
        )
        .subscribe();
    });
  }

  toggleMode(bool: boolean) {
    this.viewMode = bool;
  }

  constructor(private userService: UserService, private storage: AngularFireStorage, private authService: AuthService) {}

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userService.getStaffById(user?.id).subscribe((res) => {
      console.log(res);
      this.user = res;
      localStorage.setItem("user", JSON.stringify(res)!);
      this.authService.updateUser(res);
    });
  }
}
