import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamSpeakingListComponent } from './exam-speaking-list.component';

const routes: Routes = [
  { path: '', component: ExamSpeakingListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamSpeakingRoutingModule { }
