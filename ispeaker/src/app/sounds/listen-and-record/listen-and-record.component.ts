import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from 'src/app/audio-recording.service';
import { SoundsService } from '../sounds.service';

@Component({
  selector: 'app-listen-and-record',
  templateUrl: './listen-and-record.component.html',
  styleUrls: ['./listen-and-record.component.scss']
})
export class ListenAndRecordComponent implements OnInit, OnDestroy {
  listenRecordData: any;
  audio = new Audio();
  currentSound: any;
  constructor(public soundsService: SoundsService, private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.currentSound.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.currentSound.recordedTime = time;
    });
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.currentSound.recordedAudio = URL.createObjectURL(data.blob);
    });
  }

  ngOnInit() {
    this.listenRecordData = this.soundsService.selectedSoundDetails[this.soundsService.selectedLanguage].listen_and_record;
  }
  playSound(sound) {

    this.audio.src = '../../../assets/audio/' + sound.audio + '.mp3';
    this.audio.load();
    this.audio.play();
  }
  startStopRecording(sound) {
    this.audio.pause();
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
      sound.isPlaying = false;
      this.audio.pause();
      if (currSound !== sound) {
        sound.isRecording = false;
        this.audioRecordingService.abortRecording();
      }

    }
  }
  playStopRecordedAudio(sound) {
    this.resetRecording(sound);
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
    this.audio.pause();
    this.audio = null;
  }
}
