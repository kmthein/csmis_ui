import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pdf-uploader',
  templateUrl: './pdf-uploader.component.html',
  styleUrl: './pdf-uploader.component.css'
})
export class PdfUploaderComponent {
  uploadProgress: number | undefined;
  downloadURL: string | undefined;

  constructor(private storage: AngularFireStorage) {}

  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Monitor upload progress
    task.percentageChanges().subscribe(progress => {
      this.uploadProgress = progress;
    });

    // Get download URL after successful upload
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.downloadURL = url;  // This is the viewable URL
          console.log('File available at:', this.downloadURL);
        });
      })
    ).subscribe();
  }
}
