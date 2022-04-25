import { Component, OnInit } from '@angular/core';
import { SoundsService } from '../sounds.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { ISpeakerService } from 'src/app/ispeaker.service';

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
  constructor(public ispeakerService: ISpeakerService,public soundsService: SoundsService) { }

  ngOnInit() {
    this.practiseSet = this.soundsService.selectedSoundDetails[this.soundsService.selectedLanguage].practice;
    if (this.soundsService.selectedSoundDetails[this.soundsService.selectedLanguage].currentSet) {
      this.currentSet = this.soundsService.selectedSoundDetails[this.soundsService.selectedLanguage].currentSet;
    } else {
      this.currentSet = 0;
    }

    this.practiseData = _.cloneDeep(this.practiseSet[this.currentSet]);
    if (this.practiseData.score) {
      this.score = this.practiseData.score;
      this.currentIndex = this.practiseData.questions.length;
    }
  }

  playSound(option) {
    this.audio.src = '/media/ispeaker/assets/new/' + option.audio + '.mp3';
    this.audio.load();
    this.audio.play();

  }
  onNextClick() {
    this.isAnswered = false;
    this.currentIndex++;
    if (this.currentIndex >= this.practiseData.questions.length) {
      this.practiseSet[this.currentSet] = this.practiseData;
      this.practiseData.score = this.score;
      this.soundsService.saveSoundData();
    }
  }
  checkAnswer(option) {
    option.userAnswer = true;
    this.isAnswered = true;
    if (option.correct) {
      this.score++;
    }
  }
  loadSet() {
    // this.isAnswered = false;
    this.currentIndex = 0;
    this.currentSet++;
    this.soundsService.selectedSoundDetails[this.soundsService.selectedLanguage].currentSet = this.currentSet;
    this.score = 0;
    // for (let ques of this.practiseSet[this.currentSet].questions) {
    //   for (let option of ques.options) {
    //     option.userAnswer = undefined;
    //   }

    // }
    this.practiseData.score = this.score;
    this.soundsService.saveSoundData();
    this.practiseData = _.cloneDeep(this.practiseSet[this.currentSet]);
  }

  startAgain() {
    this.isAnswered = false;
    this.currentIndex = 0;
    this.currentSet = 0;
    this.soundsService.selectedSoundDetails[this.soundsService.selectedLanguage].currentSet = this.currentSet;
    this.score = 0;
    for (let set of this.practiseSet) {
      for (let ques of set.questions) {
        for (let option of ques.options) {
          option.userAnswer = undefined;
        }
      }
    }
    this.practiseData.score = this.score;
    this.soundsService.saveSoundData();
    this.practiseData = _.cloneDeep(this.practiseSet[this.currentSet]);
  }

}
