import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpeakerService } from '../ispeaker.service';
import { ExamSpeakingMenu } from './exam-speaking.model';

@Injectable({
    providedIn: 'root'
})
export class ExamSpeakingService {
    examSpeakingMenuList: Array<ExamSpeakingMenu> = [];
    // tslint:disable-next-line:no-string-literal
    userId = window['userId'];
    baseUrl = '';
    currentType;
    constructor(private http: HttpClient, private ispeakerService: ISpeakerService, private meta: Meta) {
        if (this.userId) {
            // tslint:disable-next-line:no-string-literal
            this.baseUrl = window['oldoApi']._baseUrl + 'fileapi/v1/';
        }
    }

    fetchExamSpeakingMenu(): Observable<any> {
        if (this.examSpeakingMenuList) {
            return this.http.get(environment.baseHref + 'assets/json/examSpeakingMenu.json').pipe(map((data: any) => {
                this.examSpeakingMenuList = data.examSpeakingMenu;
                return this.examSpeakingMenuList;
            }));
        } else {
            return of(this.examSpeakingMenuList);
        }
    }
    fetchExistingExamSpeakingMenu() { }

}
