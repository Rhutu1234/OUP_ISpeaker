import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  constructor(public examSpeakingService: ExamSpeakingService, private sanitizer: DomSanitizer, public ispeakerService: ISpeakerService,
    // tslint:disable-next-line:align
    private audioRecordingService: AudioRecordingService) {
    if (this.examSpeakingService.selectedExamSpeakingType) {
      console.log(this.examSpeakingService.selectedExamSpeakingType);
      this.practiceData = this.examSpeakingService.selectedExamSpeakingType.practise;
      this.initializeRecordingVariable();


    }
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.currentTask.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.currentTask.recordedTime = time;
    });
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
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
}
