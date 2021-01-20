import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AudioRecordingService } from 'src/app/audio-recording.service';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { environment } from 'src/environments/environment';
import { ExamSpeakingService } from '../exam-speaking.service';

@Component({
  selector: 'app-exam-speaking-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  practiceData: any;
  currentIndex;
  audio = new Audio();
  currentTask;
  recordingFailedSubscription: Subscription;
  getRecordedTimeSubscription: Subscription;
  getRecordedBlobSubscription: Subscription;
  constructor(public examSpeakingService: ExamSpeakingService, private sanitizer: DomSanitizer, public ispeakerService: ISpeakerService,
    // tslint:disable-next-line:align
    private audioRecordingService: AudioRecordingService) {
    if (this.examSpeakingService.selectedExamSpeakingType) {
      console.log(this.examSpeakingService.selectedExamSpeakingType);
      this.practiceData = this.examSpeakingService.selectedExamSpeakingType.practise;
      this.initializeRecordingVariable();


    }
    this.recordingFailedSubscription = this.audioRecordingService.recordingFailed().subscribe(() => {
      this.currentTask.isRecording = false;
    });

    this.getRecordedTimeSubscription = this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.currentTask.recordedTime = time;
    });
    this.getRecordedBlobSubscription = this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      const reader = new FileReader();
      reader.readAsDataURL(data.blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        this.currentTask.recordedAudio = base64data;
        this.examSpeakingService.saveExamSpeakingTypeUserData();
      };

    });
  }

  ngOnInit() {
  }
  initializeRecordingVariable() {
    for (const task of this.practiceData.task) {
      task.isPlaying = false;
      task.isRecording = false;
      if (!task.recordedAudio) {
        task.recordedAudio = null;
      }
    }
  }

  startStopRecording(index) {
    this.currentTask = this.practiceData.task[index];
    this.audio.pause();
    this.currentTask.isPlaying = false;
    if (!this.currentTask.isRecording) {
      this.currentTask.isRecording = true;
      this.audioRecordingService.startRecording();
    } else {
      this.currentTask.isRecording = false;
      this.audioRecordingService.stopRecording();
    }
  }
  resetRecording(currSound) {
    for (const sound of this.practiceData.task) {
      this.audio.pause();
      if (currSound !== sound) {
        sound.isPlaying = false;
        sound.isRecording = false;
        this.audioRecordingService.abortRecording();
      }

    }
  }
  playStopRecordedAudio(index) {

    this.currentTask = this.practiceData.task[index];
    this.resetRecording(this.currentTask);
    this.currentTask.isRecording = false;
    this.audioRecordingService.abortRecording();
    if (this.currentTask.isPlaying) {
      this.currentTask.isPlaying = false;
      this.audio.pause();
    } else {
      this.currentTask.isPlaying = true;
      this.audio.src = this.currentTask.recordedAudio;
      this.audio.load();
      this.audio.play();
      this.audio.onended = () => {
        this.currentTask.isPlaying = false;
      };
    }
  }
  ngOnDestroy() {
    this.audio.pause();
    this.audio = null;
    this.recordingFailedSubscription.unsubscribe();
    this.getRecordedTimeSubscription.unsubscribe();
    this.getRecordedBlobSubscription.unsubscribe();
  }
}
