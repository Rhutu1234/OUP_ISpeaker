import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  recordingFailedSubscription: Subscription;
  getRecordedTimeSubscription: Subscription;
  getRecordedBlobSubscription: Subscription;
  constructor(public conversationsService: ConversationsService, public ispeakerService: ISpeakerService,
    // tslint:disable-next-line:align
    private audioRecordingService: AudioRecordingService) {
    if (this.conversationsService.selectedConversationType) {
      this.practiseData = this.conversationsService.selectedConversationType.practise;
      if (!this.practiseData.userDialogueData) {
        this.practiseData.userDialogueData = '';
      }
      this.practiseData.isPlaying = false;
      this.practiseData.isRecording = false;
      if (!this.practiseData.recordedAudio) {
        this.practiseData.recordedAudio = null;
      }
    }
    this.recordingFailedSubscription = this.audioRecordingService.recordingFailed().subscribe(() => {
      this.practiseData.isRecording = false;
    });

    this.getRecordedTimeSubscription = this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.practiseData.recordedTime = time;
    });
    this.getRecordedBlobSubscription = this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      const reader = new FileReader();
      reader.readAsDataURL(data.blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        this.practiseData.recordedAudio = base64data;
        this.conversationsService.saveConversationUserData();
      };

    });
  }

  ngOnInit() {
    if (this.practiseData.score) {
      this.score = this.practiseData.score;
      this.currentIndex = this.practiseData.questions.length;
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
      if (currQues.userAns && this.checkDictationAns(currQues)) {
        this.score++;
      }
    }
    if (currQues.type === 'text-entry-closed') {
      if (currQues.userAns && this.checkTextEntryClosedAns(currQues)) {
        this.score++;
      }

    }
    if (currQues.type === 'unique-selection-expanded' || currQues.type === 'unique-selection-inline') {
      console.log(currQues);
      let correct = [];
      for (const ques of currQues.interaction) {
        for (const option of ques.options) {
          if (ques.userAns === option.text && option.correct) {
            correct.push(true);
          }
        }
      }
      if (correct.length === currQues.interaction.length) {
        this.score++;
      }
    }
  }

  checkDictationAns(currQues) {
    let correct = false;
    if (currQues.userAns) {
      currQues.responseText.forEach(ans => {
        if (ans.toLowerCase() === currQues.userAns.toLowerCase()) {
          correct = true;
        }
      });
    }
    return correct;
  }

  checkTextEntryClosedAns(currQues) {
    if (currQues.multiple) {
      let correct = false;
      if (currQues.userAns) {
        currQues.ans.forEach(ans => {
          if (ans.toLowerCase() === currQues.userAns.toLowerCase()) {
            correct = true;
          }
        });
      }
      return correct;
      // return (currQues.userAns && currQues.ans.indexOf(currQues.userAns.toLowerCase()) !== -1)
    } else {
      return (currQues.userAns && currQues.userAns.toLowerCase() === currQues.ans.toLowerCase())
    }

  }

  onSkipClick() {
    this.isAnswered = false;
    this.audio.pause();
    this.practiseData.isRecording = false;
    this.audioRecordingService.abortRecording();
    this.currentIndex++;
    if (this.currentIndex >= this.practiseData.questions.length) {
      this.practiseData.score = this.score;
      this.conversationsService.saveConversationUserData();
    }
  }

  restartTest() {
    this.practiseData.questions.forEach(ques => {
      ques.userAns = null;
      if (ques.type === 'unique-selection-expanded' || ques.type === 'unique-selection-inline') {
        for (const interact of ques.interaction) {
          interact.userAns = null;
        }
      }
    });
    this.score = 0;
    this.practiseData.score = 0;
    this.currentIndex = 0;

    this.conversationsService.saveConversationUserData();
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio = null;
    this.recordingFailedSubscription.unsubscribe();
    this.getRecordedTimeSubscription.unsubscribe();
    this.getRecordedBlobSubscription.unsubscribe();
  }
}
