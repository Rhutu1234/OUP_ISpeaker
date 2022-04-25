import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SoundsService } from '../sounds.service';
import { ISpeakerService } from 'src/app/ispeaker.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  videoLink: any;

  @ViewChild('videoWrapper', { static: false }) videoWrapper: ElementRef;
  constructor(public ispeakerService: ISpeakerService,public soundsService: SoundsService, private sanitizer: DomSanitizer
  ) {
    this.videoLink = this.soundsService.selectedSoundDetails[this.soundsService.selectedLanguage].videoLink;
    this.videoLink = this.sanitizer.bypassSecurityTrustHtml(this.videoLink);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.onResize('event');
  }
  onResize(event) {

    let width = this.videoWrapper.nativeElement.offsetWidth;
    const height: any = Math.round((width / 16) * 9);
    const iframe = document.getElementsByTagName('iframe')[0];
    if (width > 600) {
      width = 600;
    }
    iframe.setAttribute('width', width);
    iframe.setAttribute('height', height);

  }

}
