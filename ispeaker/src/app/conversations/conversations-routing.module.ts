import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationsListComponent } from './conversations-list.component';
import { ConversationDetailsComponent } from './conversation-details/conversation-details.component';

const routes: Routes = [
  { path: 'conversationsDetails/:type', component: ConversationDetailsComponent },
  { path: '', component: ConversationsListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationsRoutingModule { }
