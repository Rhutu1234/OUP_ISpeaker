import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoundsRoutingModule } from './sounds-routing.module';
import { SoundListComponent } from './soundList.component';
import { SoundDetailsComponent } from './sound-details/sound-details.component';


@NgModule({
  declarations: [SoundListComponent, SoundDetailsComponent],
  imports: [
    CommonModule,
    SoundsRoutingModule
  ]
})
export class SoundsModule { }
