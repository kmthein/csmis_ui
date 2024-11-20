import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'csmis_client';


  private flowbiteInitialized = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.resetFlowbiteInitialization();
      }
    });
  }

  ngAfterViewChecked(): void {
    if (!this.flowbiteInitialized) {
      initFlowbite(); // Reinitialize Flowbite components after navigation
      this.flowbiteInitialized = true;
    }
  }

  resetFlowbiteInitialization(): void {
    this.flowbiteInitialized = false; // Reset flag after each navigation
  }
}
