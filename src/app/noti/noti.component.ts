import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SuggestionService } from '../services/suggestion.service';
import { AnnouncementService } from '../services/announcement/announcement.service';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.css'],
})
export class NotiComponent implements OnInit {
  unreadCount = 0;
  unreadSuggestions: any[] = []; // Array to hold suggestions
  unreadAnnouncements: any[] = []; // Array to hold announcements
  suggestions: any[] = [];
  announcements: any[] = [];
  isAdmin: boolean = false;
  private clickListener: () => void;

  constructor(
    private webSocketService: WebSocketService,
    private suggestionService: SuggestionService,
    private announcementService: AnnouncementService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {
    this.clickListener = this.renderer.listen('document', 'click', (event) => {
      const dropdown = document.getElementById('dropdownNotification');
      const button = document.getElementById('dropdownNotificationButton');
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        !button!.contains(event.target)
      ) {
        this.isDropdownVisible = false;
      }
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
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
    const { message: content, userName } = message;
    const suggestion = {
      seen: false,
      username: userName,
      createdAt: new Date().getTime(),
    };
    this.unreadSuggestions.push(message); // Add the new suggestion to the array
    this.suggestions.unshift(suggestion);
    this.showToast('New suggestion has been received.');
    this.loadUnreadCount();
  }

  isDropdownVisible = false;

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  openDropdown() {
    this.isDropdownVisible = true;
  }

  navigateToSuggestDetails(suggestionId: string, isSeen: boolean): void {
    if (isSeen) {
      this.router.navigate([`/admin/suggestions/${suggestionId}`]);
    } else {
      const form = new FormData();
      const user = JSON.parse(localStorage.getItem('user')!);
      form.append('userId', user?.id);
      if(this.isAdmin) {
        this.suggestionService
        .getSuggestionAndMakeSeen(+suggestionId, form)
        .subscribe((res) => {
          this.router.navigate([`/admin/suggestions/${suggestionId}`]);
          this.loadUnreadCount();
        });
      }
      
    }
    this.isDropdownVisible = false;
  }

  navigateToAnnouncementDetails(announceId: string, isSeen: boolean): void {
    if (isSeen) {
      this.router.navigate([`/announcement/${announceId}`]);
    } else {
      const form = new FormData();
      const user = JSON.parse(localStorage.getItem('user')!);
      form.append('userId', user?.id);
      this.announcementService
        .getAnnouncementAndMakeSeen(+announceId, form)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate([`/announcement/${announceId}`]);
          this.loadUnreadCount();
        });
    }
    this.isDropdownVisible = false;
  }

  private handleNewAnnouncementNotification(message: any): void {
    const announcement = message; // Parse or map the message if needed
    this.unreadAnnouncements.push(announcement); // Add the new announcement to the array
    this.incrementUnreadCount();
    this.showToast('New announcement has been received.');
    this.loadUnreadCount();
  }

  navigateToSuggestionList(): void {
    this.router.navigate(['/admin/suggestions']);
    this.isDropdownVisible = false;
  }

  navigateToAnnouncementList(): void {
    this.router.navigate(['/admin/announcements']);
  }

  navigateToNotificationList() {
    if(this.isAdmin) {
      this.router.navigate(['/admin/notifications/all']);
    } else {
      this.router.navigate(['/notifications/all']);
    }
    this.isDropdownVisible = false;
  }

  private incrementUnreadCount(): void {
    this.unreadCount += 1;
  }

  private loadUnreadCount(): void {
    const userId = this.authService.getUserId();

    if (userId !== null) {
      if (this.authService.isAdmin()) {
        this.suggestionService
          .getUnseenSuggestionsByUserId(userId)
          .subscribe((suggestions) => {
            console.log(suggestions);
            this.suggestions = suggestions;
            const unreadSuggestions = suggestions.filter(
              (data: any) => data.seen == false
            );
            this.unreadCount = unreadSuggestions.length;
          });
      } else {
        this.announcementService
          .getUnseenAnnouncementsByUserId(userId)
          .subscribe((announcements) => {
            console.log(announcements);
            this.announcements = announcements;
            const unreadAnnounces = announcements.filter(
              (data: any) => data.seen == false
            );
            this.unreadCount = unreadAnnounces.length;
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
