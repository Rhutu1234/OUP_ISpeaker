import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamSpeakingRoutingModule } from './exam-speaking-routing.module';
import { ExamSpeakingListComponent } from './exam-speaking-list.component';
import { ExamSpeakingDetailsComponent } from './exam-speaking-details/exam-speaking-details.component';
import { WatchAndStudyComponent } from './watch-and-study/watch-and-study.component';
import { ListenComponent } from './listen/listen.component';
import { ReviewComponent } from './review/review.component';
import { PracticeComponent } from './practice/practice.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [ExamSpeakingListComponent,
    ExamSpeakingDetailsComponent,
    WatchAndStudyComponent,
    ListenComponent,
    ReviewComponent,
    PracticeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    AccordionModule,
    InputTextareaModule,
    RadioButtonModule,
    ExamSpeakingRoutingModule
  ]
})
export class ExamSpeakingModule { }
