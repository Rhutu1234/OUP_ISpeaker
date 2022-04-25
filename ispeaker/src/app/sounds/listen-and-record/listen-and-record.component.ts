import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AudioRecordingService } from 'src/app/audio-recording.service';
import { environment } from 'src/environments/environment';
import { SoundsService } from '../sounds.service';
import { ISpeakerService } from 'src/app/ispeaker.service';

@Component({
  selector: 'app-listen-and-record',
  templateUrl: './listen-and-record.component.html',
  styleUrls: ['./listen-and-record.component.scss']
})
export class ListenAndRecordComponent implements OnInit, OnDestroy {
  listenRecordData: any;
  audio = new Audio();
  currentSound: any;
  recordingFailedSubscription: Subscription;
  getRecordedTimeSubscription: Subscription;
  getRecordedBlobSubscription: Subscription;
  constructor(public ispeakerService: ISpeakerService, public soundsService: SoundsService, private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {

    this.recordingFailedSubscription = this.audioRecordingService.recordingFailed().subscribe(() => {
      this.currentSound.isRecording = false;
    });

    this.getRecordedTimeSubscription = this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.currentSound.recordedTime = time;
    });
    this.getRecordedBlobSubscription = this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      // this.currentSound.recordedAudio = URL.createObjectURL(data.blob);
      const reader = new FileReader();
      reader.readAsDataURL(data.blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        this.currentSound.recordedAudio = base64data;
        this.soundsService.saveSoundData();
      };

    });
  }

  ngOnInit() {
    this.listenRecordData = this.soundsService.selectedSoundDetails[this.soundsService.selectedLanguage].listen_and_record;
  }
  playSound(sound) {
    
    this.audio.src = '/media/ispeaker/assets/new/' + sound.audio + '.mp3';  
    this.audio.load();
    this.audio.play();
  }
  startStopRecording(sound) {
    this.audio.pause();
    sound.isPlaying = false;
    if (sound !== this.currentSound) {
      this.resetRecording(sound);
    }
    if (!sound.isRecording) {
      this.currentSound = sound;
      sound.isRecording = true;
      this.audioRecordingService.startRecording();
    } else {
      sound.isRecording = false;
      this.audioRecordingService.stopRecording();
    }

  }
  resetRecording(currSound) {
    for (const sound of this.listenRecordData.questions) {
      this.audio.pause();
      if (currSound !== sound) {
        sound.isPlaying = false;
        sound.isRecording = false;
        this.audioRecordingService.abortRecording();
      }

    }
  }
  playStopRecordedAudio(sound) {
    this.resetRecording(sound);
    sound.isRecording = false;
    this.audioRecordingService.abortRecording();
    this.currentSound = sound;
    if (sound.isPlaying) {
      sound.isPlaying = false;
      this.audio.pause();
    } else {
      sound.isPlaying = true;
      this.audio.src = sound.recordedAudio;
      this.audio.load();
      this.audio.play();
      this.audio.onended = () => {
        this.currentSound.isPlaying = false;
      };
    }
  }

  ngOnDestroy() {
    this.resetRecording('');
    this.audio.pause();
    this.audio = null;
    this.recordingFailedSubscription.unsubscribe();
    this.getRecordedTimeSubscription.unsubscribe();
    this.getRecordedBlobSubscription.unsubscribe();

  }
}
