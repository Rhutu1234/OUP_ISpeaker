import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataLoading = false;
  selectedLanguage = 'BE';
  constructor(private router: Router) { }

  ngOnInit() {
    this.dataLoading = false;
  }
  onLanguageSelection(type) {
    this.selectedLanguage = type;

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
