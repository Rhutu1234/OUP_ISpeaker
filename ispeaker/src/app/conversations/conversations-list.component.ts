import { Component, OnInit } from '@angular/core';
import { ISpeakerService } from '../ispeaker.service';
import { ConversationMenu } from './conversations.model';
import { ConversationsService } from './conversations.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent implements OnInit {
  conversationsMenu: Array<ConversationMenu> = [];
  dataLoading = false;
  constructor(public ispeakerService: ISpeakerService, public conversationsService: ConversationsService) { }

  ngOnInit() {
    this.dataLoading = true;
    this.conversationsService.fetchConversationMenu().subscribe((data) => {
      this.conversationsMenu = data;
      this.dataLoading = false;
    });
  }

}
