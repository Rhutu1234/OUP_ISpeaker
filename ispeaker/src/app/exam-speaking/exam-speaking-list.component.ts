import { Component, OnInit } from '@angular/core';
import { ISpeakerService } from '../ispeaker.service';
import { ExamSpeakingMenu } from './exam-speaking.model';
import { ExamSpeakingService } from './exam-speaking.service';

@Component({
  selector: 'app-exam-speaking',
  templateUrl: './exam-speaking-list.component.html',
  styleUrls: ['./exam-speaking-list.component.scss']
})
export class ExamSpeakingListComponent implements OnInit {
  examSpeakingMenu: Array<ExamSpeakingMenu> = [];
  dataLoading = false;
  constructor(public ispeakerService: ISpeakerService, public examSpeakingService: ExamSpeakingService) { }

  ngOnInit() {
    this.dataLoading = true;
    this.examSpeakingService.fetchExamSpeakingMenu().subscribe((data) => {
      console.log('fetch conversation menu');
      if (this.examSpeakingService.userId) {
        this.examSpeakingService.fetchExistingExamSpeakingMenu().then((success) => {
          console.log(success);
          this.dataLoading = false;
          this.examSpeakingMenu = this.examSpeakingService.examSpeakingMenuList;
        }, (error) => {
          this.dataLoading = false;
          this.examSpeakingMenu = this.examSpeakingService.examSpeakingMenuList;
          console.log(error);
        });
      } else {
        this.examSpeakingMenu = data;
        this.dataLoading = false;
      }

    });
  }

}
