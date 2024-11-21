import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../../../services/suggestion.service';

@Component({
  selector: 'app-suggest-details',
  templateUrl: './suggest-details.component.html',
  styleUrl: './suggest-details.component.css',
})
export class SuggestDetailsComponent {
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private suggestService: SuggestionService
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
    });
  }
}
