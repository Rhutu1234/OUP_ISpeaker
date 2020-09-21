import { Component, OnInit } from '@angular/core';
import { TabEnum } from 'src/app/app.model';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { SoundsService } from '../sounds.service';

@Component({
  selector: 'app-sound-details',
  templateUrl: './sound-details.component.html',
  styleUrls: ['./sound-details.component.scss']
})
export class SoundDetailsComponent implements OnInit {
  TabEnum = TabEnum;
  activeTab: TabEnum;
  constructor(public soundsService: SoundsService, public ispeakerService: ISpeakerService) { }

  ngOnInit() {
  }

}
