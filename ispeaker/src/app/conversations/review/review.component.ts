import { Component, OnInit } from '@angular/core';
import { AudioRecordingService } from 'src/app/audio-recording.service';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviewData: any;
  constructor(public conversationsService: ConversationsService, public ispeakerService: ISpeakerService,
    // tslint:disable-next-line:align
    private audioRecordingService: AudioRecordingService
  ) {
    if (this.conversationsService.selectedConversationType) {
      this.reviewData = this.conversationsService.selectedConversationType.reviews;

    }
  }

  ngOnInit() {
  }

}
