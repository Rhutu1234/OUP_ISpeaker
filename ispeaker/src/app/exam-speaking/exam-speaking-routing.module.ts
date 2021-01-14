import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamSpeakingDetailsComponent } from './exam-speaking-details/exam-speaking-details.component';

import { ExamSpeakingListComponent } from './exam-speaking-list.component';

const routes: Routes = [
  { path: 'examSpeakingDetails/:type', component: ExamSpeakingDetailsComponent },
  { path: '', component: ExamSpeakingListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamSpeakingRoutingModule { }
