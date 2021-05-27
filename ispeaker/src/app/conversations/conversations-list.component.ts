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
    this.ispeakerService.scrollIntoView(document.getElementsByClassName('ispeaker-wrapper')[0]);
    this.conversationsService.fetchConversationMenu().subscribe((data) => {
      console.log('fetch conversation menu');
      if (this.conversationsService.userId) {
        this.conversationsService.fetchExistingCoversationMenu().then((success) => {
          console.log(success);
          this.dataLoading = false;
          this.conversationsMenu = this.conversationsService.conversationMenuList;
        }, (error) => {
          this.dataLoading = false;
          this.conversationsMenu = this.conversationsService.conversationMenuList;
          console.log(error);
        });
      } else {
        this.conversationsMenu = data;
        this.dataLoading = false;
      }

    });
  }

}
