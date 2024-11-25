import { Component } from '@angular/core';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrl: './announcement-details.component.css'
})
export class AnnouncementDetailsComponent {
  id!: number;
  announcement: any;

  constructor(private announceService: AnnouncementService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = Number(paramMap.get('id'));
      if (id !== this.id) {
        this.id = id;
        this.getAnnouncementById();
      }
    });
  }

  getAnnouncementById() {
    this.announceService.getAnnouncementById(this.id).subscribe(res => {
      console.log(res);      
      this.announcement = res;
    })
  }
}
