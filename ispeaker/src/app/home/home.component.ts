import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISpeakerService } from '../ispeaker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataLoading = false;
  selectedLanguage;
  constructor(private router: Router, private ispeakerService: ISpeakerService) { }

  ngOnInit() {
    this.selectedLanguage = this.ispeakerService.selectedLanguage;
    this.dataLoading = false;
  }
  onLanguageSelection(type) {
    this.selectedLanguage = type;
    this.ispeakerService.selectedLanguage = type;
  }
  onTileClick(type) {
    switch (type) {
      case 'sounds':
        this.router.navigate(['/sounds']);
        break;
      case 'conversations':
        this.router.navigate(['/conversations']);
        break;
      case 'exam speaking':
        this.router.navigate(['/examSpeaking']);
        break;
    }

  }

}
