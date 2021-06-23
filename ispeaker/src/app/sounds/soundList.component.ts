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
  dataLoading = false;
  constructor(private router: Router, private soundsService: SoundsService, public ispeakerService: ISpeakerService) { }

  ngOnInit() {
    this.dataLoading = true;
    this.soundsService.fetchSoundMenu().subscribe((data) => {
      this.ispeakerService.scrollIntoView(document.getElementsByClassName('ispeaker-wrapper')[0]);
   
      this.soundsService.updateSoundDataCustom(this.soundsService.soundsData);
      console.log('fetch sound menu');
      if (this.soundsService.userId) {
        this.soundsService.fetchExistingSoundMenu().then((success) => {
          console.log(success);
          this.dataLoading = false;
          this.soundsMenu = this.soundsService.soundMenu[this.soundsService.selectedLanguage];
          
        }, (error) => {
          this.dataLoading = false;
          this.soundsMenu = this.soundsService.soundMenu[this.soundsService.selectedLanguage];
          console.log(error);
        });
      } else {
        this.dataLoading = false;
        this.soundsMenu = this.soundsService.soundMenu[this.soundsService.selectedLanguage];
      }



    }, (error) => {

    });
  }
  loadSounds(sound) {
    this.soundsService.selectedSound = sound;
    this.soundsService.getSoundDetails();
    if (this.soundsService.selectedSound.attempted) {
      this.dataLoading = true;
      this.soundsService.fetchSoundDataFile().then((success) => {
        console.log(success);
        this.router.navigate(['/sounds/soundDetails'], { skipLocationChange: true });
      }, (error) => {
        console.log(error);
        this.router.navigate(['/sounds/soundDetails'], { skipLocationChange: true });
      });
    } else {
      this.router.navigate(['/sounds/soundDetails'], { skipLocationChange: true });
    }

  }

}
