import { Component, OnInit } from '@angular/core';
import { AudioRecordingService } from 'src/app/audio-recording.service';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { environment } from 'src/environments/environment';
import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-conversations-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  practiseData: any;
  currentIndex = 0;
  score = 0;
  audio = new Audio();
  isAnswered = false;
  constructor(public conversationsService: ConversationsService, public ispeakerService: ISpeakerService,
    // tslint:disable-next-line:align
    private audioRecordingService: AudioRecordingService) {
    if (this.conversationsService.selectedConversationType) {
      this.practiseData = this.conversationsService.selectedConversationType.practise;
      this.practiseData.userDialogueData = '';
      this.practiseData.isPlaying = false;
      this.practiseData.isRecording = false;
      if (!this.practiseData.recordedAudio) {
        this.practiseData.recordedAudio = null;
      }
    }
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.practiseData.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.practiseData.recordedTime = time;
    });
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      const reader = new FileReader();
      reader.readAsDataURL(data.blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        this.practiseData.recordedAudio = base64data;
        // this.soundsService.saveConversationUserData();
      };

    });
  }

  ngOnInit() {
    if (this.practiseData.score) {
      this.score = this.practiseData.score;
    }
  }
  playSound(currQues) {
    this.audio.src = environment.baseHref + 'assets/audio/' + currQues.audioSrc;
    this.audio.load();
    this.audio.play();
  }
  startStopRecording(practiseData) {
    this.audio.pause();
    practiseData.isPlaying = false;
    if (!practiseData.isRecording) {
      practiseData.isRecording = true;
      this.audioRecordingService.startRecording();
    } else {
      practiseData.isRecording = false;
      this.audioRecordingService.stopRecording();
    }
  }
  playStopRecordedAudio(practiseData) {
    practiseData.isRecording = false;
    this.audioRecordingService.abortRecording();
    if (practiseData.isPlaying) {
      practiseData.isPlaying = false;
      this.audio.pause();
    } else {
      practiseData.isPlaying = true;
      this.audio.src = practiseData.recordedAudio;
      this.audio.load();
      this.audio.play();
      this.audio.onended = () => {
        practiseData.isPlaying = false;
      };
    }
  }


  onCheckClick(currQues) {
    this.isAnswered = true;
    if (currQues.type === 'text-entry-dictation') {
      if (currQues.userAns) {
        this.score++;
      }
    }
    if (currQues.type === 'text-entry-closed') {
      if (currQues.userAns.toLowerCase() === currQues.ans) {
        this.score++;
      }
    }
    if (currQues.type === 'unique-selection-expanded' || currQues.type === 'unique-selection-inline') {
      console.log(currQues);
      let correct = true;
      for (const ques of currQues.interaction) {
        for (const option of ques.options) {
          if (ques.userAns === option.text && option.correct) {
            // this.score++;
          } else {
            correct = false;
          }
        }
      }
      if (correct) {
        this.score++;
      }
    }
  }

  onSkipClick() {
    this.isAnswered = false;
    this.audio.pause();
    this.practiseData.isRecording = false;
    this.audioRecordingService.abortRecording();
    this.currentIndex++;
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio = null;
  }
}
