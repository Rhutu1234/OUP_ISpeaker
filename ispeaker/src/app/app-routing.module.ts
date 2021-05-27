import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SessionExpirationComponent } from './shared/session-expiration/session-expiration.component';


const routes: Routes = [
  {
    path: 'sounds', loadChildren: () => import('./sounds/sounds.module').then(m => m.SoundsModule)
  },
  {
    path: 'conversations', loadChildren: () => import('./conversations/conversations.module').then(m => m.ConversationsModule)
  },
  {
    path: 'examSpeaking', loadChildren: () => import('./exam-speaking/exam-speaking.module').then(m => m.ExamSpeakingModule)
  }, {
    path: 'session-expire',
    component: SessionExpirationComponent
  }, {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  }, {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
