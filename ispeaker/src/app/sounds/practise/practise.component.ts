import { Component, OnInit } from '@angular/core';
import { SoundsService } from '../sounds.service';

@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.scss']
})
export class PractiseComponent implements OnInit {
  audio = new Audio();
  practiseData: any;
  currentIndex = 0;
  score = 0;
  showResult = false;
  currentSet = 0;
  practiseSet = [];
  isAnswered = false;
  constructor(public soundsService: SoundsService) { }

  ngOnInit() {
    this.practiseSet = this.soundsService.selectedSoundDetails[this.soundsService.selectedLanguage].practice;
    this.practiseData = this.practiseSet[this.currentSet];
  }

  playSound(option) {
    this.audio.src = '../../../assets/audio/' + option.audio + '.mp3';
    this.audio.load();
    this.audio.play();

  }
  onNextClick() {
    this.isAnswered = false;
    this.currentIndex++;
  }
  checkAnswer(option) {
    option.userAnswer = true;
    this.isAnswered = true;
    if (option.correct) {
      this.score++;
    }
  }
  loadSet() {
    this.currentIndex = 0;
    this.currentSet++;
    this.practiseData.score = this.score;
    this.score = 0;
    this.practiseData = this.practiseSet[this.currentSet];
  }

}
