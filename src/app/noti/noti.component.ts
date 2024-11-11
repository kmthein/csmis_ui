import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.css']
})
export class NotiComponent implements OnInit {
  unreadCount = 0;

  constructor(
    private webSocketService: WebSocketService, 
    private suggestionService: SuggestionService, 
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
          this.handleNewSuggestionNotification();
        }
      });
    });
  }

  private handleNewSuggestionNotification(): void {
    this.showToast('New suggestion has been received.');
    this.incrementUnreadCount();
  }

  navigateToSuggestionList(): void {
    this.router.navigate(['/admin/suggestions']);
  }

  private incrementUnreadCount(): void {
    this.unreadCount += 1;
  }

  private loadUnreadCount(): void {
    const userId = this.authService.getUserId();
    
    if (userId !== null) {
      this.suggestionService.getUnseenSuggestionsByUserId(userId).subscribe(suggestions => {
        this.unreadCount = suggestions.length;
      });
    } else {
      this.unreadCount = 0; // Set to 0 or handle it based on your requirements
    }
  }

  private showToast(message: string): void {
    this.toastr.info(message);
  }
}
