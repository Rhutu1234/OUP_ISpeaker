import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamSpeakingRoutingModule } from './exam-speaking-routing.module';
import { ExamSpeakingListComponent } from './exam-speaking-list.component';


@NgModule({
  declarations: [ExamSpeakingListComponent],
  imports: [
    CommonModule,
    ExamSpeakingRoutingModule
  ]
})
export class ExamSpeakingModule { }
