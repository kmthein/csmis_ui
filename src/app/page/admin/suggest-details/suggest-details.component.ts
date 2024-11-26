import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../services/suggestion.service';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-suggest-details',
  templateUrl: './suggest-details.component.html',
  styleUrl: './suggest-details.component.css',
})
export class SuggestDetailsComponent {
  id!: number;
  suggestion: any;

  navgiateBack() {
    this.location.back();
  }

  constructor(
    private route: ActivatedRoute,
    private suggestService: SuggestionService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = Number(paramMap.get('id'));
      if (id !== this.id) {
        this.id = id;
        this.getSuggestionAndMakeSeen();
      }
    });
  }

  getSuggestionAndMakeSeen() {
    this.suggestService.getSuggestionById(this.id).subscribe((res) => {
      console.log(res);
      this.suggestion = res;
    });
  }
}
