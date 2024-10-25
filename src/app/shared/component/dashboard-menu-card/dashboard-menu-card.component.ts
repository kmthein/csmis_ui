import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-menu-card',
  templateUrl: './dashboard-menu-card.component.html',
  styleUrl: './dashboard-menu-card.component.css'
})
export class DashboardMenuCardComponent {
  @Input() menu: any = [];

  constructor() {
  }

  ngOnInit() {
  }
}
