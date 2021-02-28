import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ISpeakerService {
  selectedLanguage = 'BrE';
  userId = window['userId'];
  baseUrl = '';

  constructor(private http: HttpClient, private meta: Meta) {
    if (this.userId) {
      // tslint:disable-next-line:no-string-literal
      this.baseUrl = window['oldoApi']._baseUrl + 'fileapi/v1/';
    }
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

  resetAll() {
    // const url = this.baseUrl + 'info/' + this.userId + '/';
    // this.http.get(url).subscribe((data: any) => {
    //   console.log(data);
    //   if (data.length) {
    //     for (const fileDetail of data) {
    //       this.deleteFile(fileDetail[0]);
    //     }
    //   }

    // });
    this.deleteFile();
  }
  deleteFile() {
    // const destUrl = this.baseUrl + 'file/' + fileName;
    // this.http.delete(destUrl).subscribe((data) => {
    //   console.log(data);

    // });
    if (this.userId) {
      this.uploadSoundsMenu();
      this.uploadConversationMenu();
      this.uploadExamSpeakingMenu();
    }
  }

  uploadSoundsMenu() {
    this.http.get(environment.baseHref + 'assets/json/soundsMenu.json').pipe(map((data: any) => {
      return data;

    })).subscribe((data) => {


      const destUrl = this.baseUrl + 'file/' + this.userId + '/soundMenu.json';
      const jsonStr = 'jsonpCallbackFunction(' + JSON.stringify(data) + ');';
      const formData: FormData = new FormData();
      formData.append('file', jsonStr);
      formData.append('redirect', 'true');

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 207) {
            // console.log(JSON.parse(xhr.response));
          } else {
            // console.log(JSON.parse(xhr.response));
          }
          console.log('uploading sound file successfull');
        }
      };
      xhr.open('PUT', destUrl, true);
      const token = this.meta.getTag('name=_csrf').content;
      const csrfHeader = this.meta.getTag('name=_csrf_header').content;
      xhr.setRequestHeader(csrfHeader, token);
      xhr.send(formData);
    });
  }

  uploadConversationMenu() {
    this.http.get(environment.baseHref + 'assets/json/conversation_menu.json').pipe(map((data: any) => {
      return data.conversationMenu;

    })).subscribe((data) => {


      const destUrl = this.baseUrl + 'file/' + this.userId + '/conversation_menu_' + this.selectedLanguage + '.json';
      const jsonStr = 'jsonpCallbackFunction(' + JSON.stringify(data) + ');';
      const formData: FormData = new FormData();
      formData.append('file', jsonStr);
      formData.append('redirect', 'true');

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 207) {
            // console.log(JSON.parse(xhr.response));
          } else {
            // console.log(JSON.parse(xhr.response));
          }
          console.log('uploading Conversation file successfull');
        }
      };
      xhr.open('PUT', destUrl, true);
      const token = this.meta.getTag('name=_csrf').content;
      const csrfHeader = this.meta.getTag('name=_csrf_header').content;
      xhr.setRequestHeader(csrfHeader, token);
      xhr.send(formData);
    });

  }
  uploadExamSpeakingMenu() {
    this.http.get(environment.baseHref + 'assets/json/examSpeakingMenu.json').pipe(map((data: any) => {
      return data.examSpeakingMenu;

    })).subscribe((data) => {


      const destUrl = this.baseUrl + 'file/' + this.userId + '/exam_menu_' + this.selectedLanguage + '.json';
      const jsonStr = 'jsonpCallbackFunction(' + JSON.stringify(data) + ');';
      const formData: FormData = new FormData();
      formData.append('file', jsonStr);
      formData.append('redirect', 'true');

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 207) {
            // console.log(JSON.parse(xhr.response));
          } else {
            // console.log(JSON.parse(xhr.response));
          }
          console.log('uploading exam speanking file successfull');
        }
      };
      xhr.open('PUT', destUrl, true);
      const token = this.meta.getTag('name=_csrf').content;
      const csrfHeader = this.meta.getTag('name=_csrf_header').content;
      xhr.setRequestHeader(csrfHeader, token);
      xhr.send(formData);
    });

  }
}
