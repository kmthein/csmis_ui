import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement/announcement.service';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.component.html',
  styleUrls: ['./all-notifications.component.css']
})
export class AllNotificationsComponent implements OnInit {
  announcements: any[] = []; // Replace `any` with an `Announcement` interface if available
  loading: boolean = false;

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit() {
    this.fetchAllAnnouncements();
  }

  fetchAllAnnouncements() {
    this.loading = true;
    this.announcementService.getAllAnnouncement().subscribe({
      next: (res) => {
        this.announcements = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching announcements:', err);
        this.loading = false;
      }
    });
  }
}
