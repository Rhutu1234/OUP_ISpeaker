import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ISpeakerService {
  selectedLanguage = 'BrE';
  constructor() {

  }
  
  scrollIntoView = (e: any) => {

    let elem = document.getElementById('searchbar');
    let elemHeight = 0;
    if (elem) {
      elemHeight = elem.offsetHeight;
    }
    elem = document.getElementById('ox-container');
    if (elem && elem.offsetWidth < 767) {
      elemHeight += document.getElementById('ox-header').offsetHeight;
    }
    window.scroll(0, (this.findPos(e) - elemHeight - 50));
  }

  findPos(obj: any) {
    let curtop = 0;
    if (obj.offsetParent) {
      do {
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return curtop;
    }
  }
}
