import { Component } from '@angular/core';
import { SuggestionService } from '../../../services/suggestion.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-suggest-list',
  templateUrl: './suggest-list.component.html',
  styleUrl: './suggest-list.component.css'
})
export class SuggestListComponent {
  suggestions: any[] = [];

  constructor(private suggestService: SuggestionService, private location: Location) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!); 
    this.suggestService.getUnseenSuggestionsByUserId(user?.id).subscribe(res => {
      this.suggestions = res;
    }) 
  }

  navgiateBack() {
    this.location.back();
  }
}
