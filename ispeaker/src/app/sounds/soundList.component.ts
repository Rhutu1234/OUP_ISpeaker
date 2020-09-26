import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISpeakerService } from '../ispeaker.service';
import { SoundsService } from './sounds.service';

@Component({
  selector: 'app-sounds',
  templateUrl: './soundList.component.html',
  styleUrls: ['./soundList.component.scss']
})
export class SoundListComponent implements OnInit {
  soundsMenu: any;
  constructor(private router: Router, private soundsService: SoundsService, public ispeakerService: ISpeakerService) { }

  ngOnInit() {
    this.ispeakerService.scrollIntoView(document.getElementsByClassName('ispeaker-wrapper')[0]);
    this.soundsService.fetchSoundMenu().subscribe((data) => {
      console.log(data);
      this.soundsMenu = data[0];
    }, (error) => {

    });
  }
  loadSounds(sound) {
    this.soundsService.selectedSound = sound;
    this.soundsService.getSoundDetails();
    this.router.navigate(['/sounds/soundDetails'], { skipLocationChange: true });
    console.log(this.soundsService.selectedSoundDetails);
  }

}
