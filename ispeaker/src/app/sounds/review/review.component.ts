import { Component, OnInit } from '@angular/core';
import { SoundsService } from '../sounds.service';
import { ISpeakerService } from 'src/app/ispeaker.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(public ispeakerService: ISpeakerService,public soundsService: SoundsService) { }

  ngOnInit() {
  }

}
