import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabEnum } from 'src/app/app.model';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['./conversation-details.component.scss']
})
export class ConversationDetailsComponent implements OnInit {
  TabEnum = TabEnum;
  activeTab;
  conversationType: string;
  dataLoading = false;
  constructor(public ispeakerService: ISpeakerService, private route: ActivatedRoute, public router: Router,
    private conversationService: ConversationsService) { }

  ngOnInit() {
    this.conversationType = this.route.snapshot.params.type;
    const attempt = this.route.snapshot.params.attempted;
    console.log(attempt);
    this.ispeakerService.scrollIntoView(document.getElementsByClassName('ispeaker-wrapper')[0]);
    this.dataLoading = true;
    this.conversationService.fetchConversationType(this.conversationType).subscribe((data) => {
      this.conversationService.selectedConversationType = data;
      if (attempt == 'true') {
        this.conversationService.fetchUserConversationDataFile().then((success) => {
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
    this.conversationService.saveConversationUserData();
    switch (type) {
      case 'mainMenu':
        this.router.navigate(['/home']);
        break;
      case 'conversationMenu':
        this.router.navigate(['/conversations'], { skipLocationChange: true });
        break;
    }
  }

}
