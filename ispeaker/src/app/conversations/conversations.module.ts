import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversationsRoutingModule } from './conversations-routing.module';
import { ConversationsListComponent } from './conversations-list.component';


@NgModule({
  declarations: [ConversationsListComponent],
  imports: [
    CommonModule,
    ConversationsRoutingModule
  ]
})
export class ConversationsModule { }
