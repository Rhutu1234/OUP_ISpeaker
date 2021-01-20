import { Component, OnInit } from '@angular/core';
import { AudioRecordingService } from 'src/app/audio-recording.service';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { ExamSpeakingService } from '../exam-speaking.service';

@Component({
  selector: 'app-exam-speaking-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviewData: any;
  constructor(public examSpeakingService: ExamSpeakingService, public ispeakerService: ISpeakerService
  ) {
    if (this.examSpeakingService.selectedExamSpeakingType) {
      this.reviewData = this.examSpeakingService.selectedExamSpeakingType.reviews;

    }
  }

  ngOnInit() {
  }
  onModelChange() {
    this.examSpeakingService.saveExamSpeakingTypeUserData();
  }

}
