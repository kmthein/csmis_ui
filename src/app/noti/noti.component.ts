import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SuggestionService } from '../services/suggestion.service';
import { AnnouncementService } from '../services/announcement/announcement.service';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.css']
})

export class NotiComponent implements OnInit {
  unreadCount = 0;
  unreadSuggestions: any[] = []; // Array to hold suggestions
  unreadAnnouncements: any[] = []; // Array to hold announcements

  constructor(
    private webSocketService: WebSocketService, 
    private suggestionService: SuggestionService, 
    private announcementService: AnnouncementService,
    private router: Router,
    private authService: AuthService, 
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.loadUnreadCount();
    this.setupWebSocket();
  }

  private setupWebSocket(): void {
    this.webSocketService.connect('http://localhost:8080/ws').then(() => {

      this.webSocketService.subscribe('/topic/suggestions', (message) => {
        if (this.authService.isAdmin()) {
          this.handleNewSuggestionNotification(message);
        }
      });

      this.webSocketService.subscribe('/topic/announcements', (message) => {
        if (!this.authService.isAdmin()) {
          this.handleNewAnnouncementNotification(message);
        }
      });
    });
  }

  private handleNewSuggestionNotification(message: any): void {
    const suggestion = message; // Parse or map the message if needed
    this.unreadSuggestions.push(suggestion); // Add the new suggestion to the array
    this.incrementUnreadCount();
    this.showToast('New suggestion has been received.');
  }
  

  private handleNewAnnouncementNotification(message: any): void {
    const announcement = message; // Parse or map the message if needed
    this.unreadAnnouncements.push(announcement); // Add the new announcement to the array
    this.incrementUnreadCount();
    this.showToast('New announcement has been received.');
  }

  navigateToSuggestionList(): void {
    this.router.navigate(['/admin/suggestions']);
  }

  navigateToAnnouncementList(): void {
    this.router.navigate(['/admin/announcements']);
  }

  private incrementUnreadCount(): void {
    this.unreadCount += 1;
  }

  private loadUnreadCount(): void {
    const userId = this.authService.getUserId();
    
    if (userId !== null) {
      if (this.authService.isAdmin()) {
        this.suggestionService.getUnseenSuggestionsByUserId(userId).subscribe(suggestions => {
          this.unreadCount = suggestions.length;
        });
      } else {
        this.announcementService.getUnseenAnnouncementsByUserId(userId).subscribe(announcements => {
          this.unreadCount = announcements.length;
        });
      }
    } else {
      this.unreadCount = 0; // Set to 0 or handle it based on your requirements
    }
  }

  private showToast(message: string): void {
    this.toastr.info(message);
  }
}
