import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoundsRoutingModule } from './sounds-routing.module';
import { SoundListComponent } from './soundList.component';


@NgModule({
  declarations: [SoundListComponent],
  imports: [
    CommonModule,
    SoundsRoutingModule
  ]
})
export class SoundsModule { }
