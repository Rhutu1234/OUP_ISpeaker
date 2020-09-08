import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  isDelayedRunning = false;
  messageStr: string;

  @Input()
  public set message(msg: string) {
    this.messageStr = msg;
  }

  @Input()
  public set isRunning(value: boolean) {
    this.isDelayedRunning = value;
  }
  ngOnInit() {

  }

}
