import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabEnum } from 'src/app/app.model';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { SoundsService } from '../sounds.service';

@Component({
  selector: 'app-sound-details',
  templateUrl: './sound-details.component.html',
  styleUrls: ['./sound-details.component.scss']
})
export class SoundDetailsComponent implements OnInit {
  TabEnum = TabEnum;
  activeTab = TabEnum.WATCH;
  constructor(public soundsService: SoundsService, public ispeakerService: ISpeakerService, public router: Router) { }

  ngOnInit() {
    if (!this.soundsService.selectedSoundDetails) {
      this.router.navigate(['/sounds/'], { skipLocationChange: true });
    }
    this.ispeakerService.scrollIntoView(document.getElementsByClassName('ispeaker-wrapper')[0]);
  }
  onBtnClick(type) {
    this.soundsService.saveSoundData();
    switch (type) {
      case 'mainMenu':
        this.router.navigate(['/home']);
        break;
      case 'sounds':
        this.router.navigate(['/sounds/'], { skipLocationChange: true });
        break;
    }
  }

}
