import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpeakerService } from '../ispeaker.service';
import { ExamSpeakingMenu } from './exam-speaking.model';
import * as _ from 'lodash';
@Injectable({
    providedIn: 'root'
})
export class ExamSpeakingService {
    examSpeakingMenuList: Array<ExamSpeakingMenu> = [];
    // tslint:disable-next-line:no-string-literal
    userId = window['userId'];
    baseUrl = '';
    currentType;
    examSpeakingData: any;
    selectedExamSpeakingType: any;
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
    fetchExamSpeakingType(type): Observable<any> {
        this.currentType = type;
        if (!this.examSpeakingData) {
            return this.http.get(environment.baseHref + 'assets/json/speaking_data.json').pipe(map((data: any) => {
                this.examSpeakingData = data;
                return this.examSpeakingData[type];
            }));
        } else {
            return of(this.examSpeakingData[type]);
        }

    }
    fetchExistingExamSpeakingMenu() {
        const selectedLanguage = this.ispeakerService.selectedLanguage;
        const soundDataUrl = this.baseUrl + 'file/' + this.userId + '/exam_menu_' + selectedLanguage + '.json';
        return new Promise((resolve, reject) => {

            this.fetchJson(soundDataUrl, (data) => {
                if (data) {
                    this.examSpeakingMenuList = data;
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    }
    saveExamSpeakingTypeUserData() {
        const userData = _.cloneDeep(this.selectedExamSpeakingType);
        this.uploadExamSpeakingMenu();
        this.uploadExamSpeakingDataFile(userData);
    }
    uploadExamSpeakingMenu() {
        console.log('uploading exam speaking menu file');
        if (this.userId) {
            const selectedLanguage = this.ispeakerService.selectedLanguage;
            for (const menu of this.examSpeakingMenuList) {
                for (const subtopic of menu.subHeading) {
                    if (subtopic.title === this.currentType) {
                        subtopic.attempted = true;
                        let isComplete = true;
                        for (const review of this.selectedExamSpeakingType.reviews) {
                            if (!review.checked) {
                                isComplete = false;
                            }
                        }
                        subtopic.completed = isComplete;
                    }
                }
            }
            const destUrl = this.baseUrl + 'file/' + this.userId + '/exam_menu_' + selectedLanguage + '.json';
            const jsonStr = 'jsonpCallbackFunction(' + JSON.stringify(this.examSpeakingMenuList) + ');';
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
        }
    }
    uploadExamSpeakingDataFile(userData) {
        console.log('uploading exam speaking UserData file');
        if (this.userId) {
            const type = this.currentType.split(' ').join('_');
            const destUrl = this.baseUrl + 'file/' + this.userId + '/' + type + '_' + this.ispeakerService.selectedLanguage + '.json';
            const jsonStr = 'jsonpCallbackFunction(' + JSON.stringify(userData) + ');';
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
        }
    }
    fetchUserExamSpeakingDataFile() {
        const type = this.currentType.split(' ').join('_');
        // if (this.userId) {
        const destUrl = this.baseUrl + 'file/' + this.userId + '/' + type + '_' + this.ispeakerService.selectedLanguage + '.json';
        return new Promise((resolve, reject) => {

            this.fetchJson(destUrl, (data) => {
                if (data) {
                    this.selectedExamSpeakingType.watch_and_study.study = data.watchAndStudy.study;
                    this.selectedExamSpeakingType.listen.recordedAudio = data.listen.recordedAudio;
                    this.selectedExamSpeakingType.practise = data.practise;
                    this.selectedExamSpeakingType.reviews = data.reviews;
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
        // }
    }
    fetchJson(url, cb) {
        // tslint:disable-next-line:no-string-literal
        window['jsonpCallbackFunction'] = (data) => {
            cb(data);
        };
        this.http.jsonp(url, 'jsonpCallbackFunction').subscribe((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
            cb(false);
        });

    }

}
