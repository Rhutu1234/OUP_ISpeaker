import { Component, OnInit } from '@angular/core';
import { SoundsService } from '../sounds.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(public soundsService: SoundsService) { }

  ngOnInit() {
  }

}
