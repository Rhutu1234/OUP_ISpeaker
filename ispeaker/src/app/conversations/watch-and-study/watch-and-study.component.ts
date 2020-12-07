import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ISpeakerService } from 'src/app/ispeaker.service';
import { ConversationsService } from '../conversations.service';

@Component({
  selector: 'app-watch-and-study',
  templateUrl: './watch-and-study.component.html',
  styleUrls: ['./watch-and-study.component.scss']
})
export class WatchAndStudyComponent implements OnInit, AfterViewInit {
  videoLink: any;
  studyData: any;
  accordHeader = 'Expand to read the video dialogue';
  isAccordOpen = false;
  @ViewChild('videoWrapper', { static: false }) videoWrapper: ElementRef;
  constructor(public conversationsService: ConversationsService, private sanitizer: DomSanitizer, public ispeakerService: ISpeakerService
  ) {
    if (this.conversationsService.selectedConversationType) {
      this.videoLink = this.conversationsService.selectedConversationType.watch_and_study.videoLink;
      this.videoLink = this.sanitizer.bypassSecurityTrustHtml(this.videoLink);
      this.studyData = this.conversationsService.selectedConversationType.watch_and_study.study;
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.onResize('event');
  }
  onResize(event) {
    const width = this.videoWrapper.nativeElement.offsetWidth;
    const height: any = Math.round((width / 16) * 9);
    const iframe = document.getElementsByTagName('iframe')[0];
    iframe.setAttribute('width', width);
    iframe.setAttribute('height', height);
  }
  onTabClose() {
    this.isAccordOpen = false;
  }
  onTabOpen() {
    this.isAccordOpen = true;
  }

}
