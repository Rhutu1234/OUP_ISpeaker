import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from 'src/app/audio-recording.service';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { environment } from 'src/environments/environment';
import { ExamSpeakingService } from '../exam-speaking.service';

@Component({
  selector: 'app-exam-speaking-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit {
  audio = new Audio();
  listenData: any;
  constructor(public examSpeakingService: ExamSpeakingService, private sanitizer: DomSanitizer, public ispeakerService: ISpeakerService,
    // tslint:disable-next-line:align
    private audioRecordingService: AudioRecordingService) {
    if (this.examSpeakingService.selectedExamSpeakingType) {
      this.listenData = this.examSpeakingService.selectedExamSpeakingType.listen[this.ispeakerService.selectedLanguage];
      this.listenData.isPlaying = false;
      this.listenData.isRecording = false;
      if (!this.listenData.recordedAudio) {
        this.listenData.recordedAudio = null;
      }
    }
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.listenData.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.listenData.recordedTime = time;
    });
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      const reader = new FileReader();
      reader.readAsDataURL(data.blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        this.listenData.recordedAudio = base64data;
        this.examSpeakingService.saveExamSpeakingTypeUserData();
      };

    });
  }

  ngOnInit() {
  }
  playSound(sentence) {
    this.audioRecordingService.abortRecording();
    this.listenData.isRecording = false;
    this.listenData.isPlaying = false;
    this.audio.src = environment.baseHref + 'assets/audio/' + sentence.audioSrc + '.mp3';
    this.audio.load();
    this.audio.play();
  }
  startStopRecording(listenData) {
    this.audio.pause();
    listenData.isPlaying = false;
    if (!listenData.isRecording) {
      listenData.isRecording = true;
      this.audioRecordingService.startRecording();
    } else {
      listenData.isRecording = false;
      this.audioRecordingService.stopRecording();
    }
  }

  playStopRecordedAudio(listenData) {
    listenData.isRecording = false;
    this.audioRecordingService.abortRecording();
    if (listenData.isPlaying) {
      listenData.isPlaying = false;
      this.audio.pause();
    } else {
      listenData.isPlaying = true;
      this.audio.src = listenData.recordedAudio;
      this.audio.load();
      this.audio.play();
      this.audio.onended = () => {
        listenData.isPlaying = false;
      };
    }
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio = null;
  }

}
