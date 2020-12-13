import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversationsRoutingModule } from './conversations-routing.module';
import { ConversationsListComponent } from './conversations-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared/shared.module';
import { ConversationDetailsComponent } from './conversation-details/conversation-details.component';
import { WatchAndStudyComponent } from './watch-and-study/watch-and-study.component';
import { ListenComponent } from './listen/listen.component';
import { PracticeComponent } from './practice/practice.component';
import { ReviewComponent } from './review/review.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import {RadioButtonModule} from 'primeng/radiobutton';
@NgModule({
  declarations: [ConversationsListComponent,
    ConversationDetailsComponent,
    WatchAndStudyComponent,
    ListenComponent,
    PracticeComponent,
    ReviewComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    ConversationsRoutingModule,
    AccordionModule,
    InputTextareaModule,
    RadioButtonModule
  ]
})
export class ConversationsModule { }
