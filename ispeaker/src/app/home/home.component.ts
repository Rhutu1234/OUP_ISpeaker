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
  constructor(private router: Router, private route: ActivatedRoute, public ispeakerService: ISpeakerService) { }

  ngOnInit() {
    this.dataLoading = true;
    this.ispeakerService.getSelectedLanguage().then((selectedLang) => {
      this.dataLoading = false;
      this.selectedLanguage = this.ispeakerService.selectedLanguage;
    }, (error) => {
      this.dataLoading = false;
      this.selectedLanguage = this.ispeakerService.selectedLanguage;
    });
    this.ispeakerService.scrollIntoView(document.getElementsByClassName('ispeaker-wrapper')[0]);

  }

  onLanguageSelection(event, type) {
    event.stopPropagation();
    this.selectedLanguage = type;
    this.ispeakerService.selectedLanguage = type;
    this.ispeakerService.saveSelectedLanguage();
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
