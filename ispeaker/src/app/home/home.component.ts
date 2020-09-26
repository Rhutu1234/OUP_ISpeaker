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
  constructor(private router: Router, private route: ActivatedRoute, private ispeakerService: ISpeakerService) { }

  ngOnInit() {
    this.selectedLanguage = this.ispeakerService.selectedLanguage;
    this.dataLoading = false;
    this.ispeakerService.scrollIntoView(document.getElementsByClassName('ispeaker-wrapper')[0]);
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
        this.router.navigate(['/conversations'], { skipLocationChange: true });
        break;
      case 'exam speaking':
        this.router.navigate(['/examSpeaking'], { skipLocationChange: true });
        break;
    }

  }

}
