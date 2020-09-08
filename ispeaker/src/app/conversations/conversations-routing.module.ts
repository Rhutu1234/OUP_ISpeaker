import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationsListComponent } from './conversations-list.component';

const routes: Routes = [
  { path: '', component: ConversationsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationsRoutingModule { }
