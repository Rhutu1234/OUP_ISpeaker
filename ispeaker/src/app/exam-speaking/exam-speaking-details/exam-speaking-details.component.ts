import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabEnum } from 'src/app/app.model';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { ExamSpeakingService } from '../exam-speaking.service';

@Component({
  selector: 'app-exam-speaking-details',
  templateUrl: './exam-speaking-details.component.html',
  styleUrls: ['./exam-speaking-details.component.scss']
})
export class ExamSpeakingDetailsComponent implements OnInit {
  TabEnum = TabEnum;
  activeTab;
  examSpeakingType: string;
  dataLoading = false;
  constructor(public ispeakerService: ISpeakerService, private route: ActivatedRoute, public router: Router,
    public examSpeakingService: ExamSpeakingService) { }

  ngOnInit() {
    this.examSpeakingType = this.route.snapshot.params.type;
    const attempt = this.route.snapshot.params.attempted;
    this.dataLoading = true;
    this.examSpeakingService.fetchExamSpeakingType(this.examSpeakingType).subscribe((data) => {
      this.examSpeakingService.selectedExamSpeakingType = data;
      if (attempt == 'true') {
        this.examSpeakingService.fetchUserExamSpeakingDataFile().then((success) => {
          this.dataLoading = false;

          this.activeTab = TabEnum.WATCH;
        }, (error) => {
          this.dataLoading = false;
          this.activeTab = TabEnum.WATCH;
        });
      } else {
        this.dataLoading = false;
        this.activeTab = TabEnum.WATCH;
      }
    });
  }
  onBtnClick(type) {
    this.examSpeakingService.saveExamSpeakingTypeUserData();
    switch (type) {
      case 'mainMenu':
        this.router.navigate(['/home']);
        break;
      case 'examSpeaking':
        this.router.navigate(['/examSpeaking'], { skipLocationChange: true });
        break;
    }
  }

}
