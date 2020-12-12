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
    this.dataLoading = true;
    this.conversationService.fetchConversationType(this.conversationType).subscribe((data) => {
      this.dataLoading = false;
      this.conversationService.selectedConversationType = data;
      this.activeTab = TabEnum.WATCH;
    });
  }

}