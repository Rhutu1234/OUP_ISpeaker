import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoundsRoutingModule } from './sounds-routing.module';
import { SoundListComponent } from './soundList.component';
import { SoundDetailsComponent } from './sound-details/sound-details.component';
import { WatchComponent } from './watch/watch.component';
import { ListenAndRecordComponent } from './listen-and-record/listen-and-record.component';
import { PractiseComponent } from './practise/practise.component';
import { ReviewComponent } from './review/review.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';
@NgModule({
  declarations: [SoundListComponent,
    SoundDetailsComponent, WatchComponent, ListenAndRecordComponent, PractiseComponent, ReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    SharedModule,
    SoundsRoutingModule,
  ]
})
export class SoundsModule { }
