import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoundDetailsComponent } from './sound-details/sound-details.component';

import { SoundListComponent } from './soundList.component';

const routes: Routes = [
  { path: 'soundDetails', component: SoundDetailsComponent },
  { path: '', component: SoundListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoundsRoutingModule { }
