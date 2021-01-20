import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from 'src/app/audio-recording.service';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { ExamSpeakingService } from '../exam-speaking.service';

@Component({
  selector: 'app-exam-speaking-watch-and-study',
  templateUrl: './watch-and-study.component.html',
  styleUrls: ['./watch-and-study.component.scss']
})
export class WatchAndStudyComponent implements OnInit, AfterViewInit {
  videoLink: any;
  studyData: any;
  accordHeader = 'Expand to read the video dialogue';
  isAccordOpen = false;
  audio = new Audio();
  currentSound: any;
  taskData;
  @ViewChild('videoWrapper', { static: false }) videoWrapper: ElementRef;
  constructor(public examSpeakingService: ExamSpeakingService, private sanitizer: DomSanitizer, public ispeakerService: ISpeakerService,
    // tslint:disable-next-line:align
    private audioRecordingService: AudioRecordingService
  ) {
    if (this.examSpeakingService.selectedExamSpeakingType) {
      console.log(this.examSpeakingService.selectedExamSpeakingType.watch_and_study);
      this.taskData = this.examSpeakingService.selectedExamSpeakingType.watch_and_study.taskData;
      this.videoLink = this.examSpeakingService.selectedExamSpeakingType.watch_and_study.videoLink;
      this.videoLink = this.sanitizer.bypassSecurityTrustHtml(this.videoLink);
      this.studyData = this.examSpeakingService.selectedExamSpeakingType.watch_and_study.study;
      this.studyData.isPlaying = false;
      this.studyData.isRecording = false;
      if (!this.studyData.recordedAudio) {
        this.studyData.recordedAudio = null;
      }
    }
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.studyData.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      console.log(time);
      this.studyData.recordedTime = time;

    });
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      // this.currentSound.recordedAudio = URL.createObjectURL(data.blob);
      const reader = new FileReader();
      reader.readAsDataURL(data.blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        this.studyData.recordedAudio = base64data;
        this.examSpeakingService.saveExamSpeakingTypeUserData();
      };

    });
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.onResize('event');
  }
  onResize(event) {
    const width = this.videoWrapper.nativeElement.offsetWidth;
    const height: any = Math.round((width / 16) * 9);
    const iframe = document.getElementsByTagName('iframe')[0];
    iframe.setAttribute('width', width);
    iframe.setAttribute('height', height);
  }
  onTabClose(event) {
    this.isAccordOpen = false;
  }
  onTabOpen(event) {
    this.isAccordOpen = true;
  }
  startStopRecording(study) {
    this.audio.pause();
    study.isPlaying = false;
    if (!study.isRecording) {
      study.isRecording = true;
      this.audioRecordingService.startRecording();
    } else {
      study.isRecording = false;
      this.audioRecordingService.stopRecording();
    }
  }

  playStopRecordedAudio(study) {
    study.isRecording = false;
    this.audioRecordingService.abortRecording();
    if (study.isPlaying) {
      study.isPlaying = false;
      this.audio.pause();
    } else {
      study.isPlaying = true;
      this.audio.src = study.recordedAudio;
      this.audio.load();
      this.audio.play();
      this.audio.onended = () => {
        study.isPlaying = false;
      };
    }
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio = null;
  }
}
