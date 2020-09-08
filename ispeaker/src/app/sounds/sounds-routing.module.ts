import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoundListComponent } from './soundList.component';

const routes: Routes = [
  { path: '', component: SoundListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoundsRoutingModule { }
