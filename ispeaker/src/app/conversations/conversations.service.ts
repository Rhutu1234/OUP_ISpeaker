import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpeakerService } from '../ispeaker.service';
import { ConversationMenu, ConversationUserData } from './conversations.model';

@Injectable({ providedIn: 'root' })
export class ConversationsService {
    conversationMenuList: Array<ConversationMenu> = [];
    conversationData: any;
    selectedConversationType: any;
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

    fetchConversationMenu(): Observable<any> {
        if (this.conversationMenuList) {
            return this.http.get(environment.baseHref + 'assets/json/conversation_menu.json').pipe(map((data: any) => {
                this.conversationMenuList = data.conversationMenu;
                return this.conversationMenuList;
            }));
        } else {
            return of(this.conversationMenuList);
        }
    }
    fetchConversationType(type): Observable<any> {
        this.currentType = type;
        if (!this.conversationData) {
            return this.http.get(environment.baseHref + 'assets/json/conversation_data.json').pipe(map((data: any) => {
                this.conversationData = data;
                return this.conversationData[type][this.ispeakerService.selectedLanguage];
            }));
        } else {
            return of(this.conversationData[type][this.ispeakerService.selectedLanguage]);
        }

    }
    fetchExistingCoversationMenu() {
        const selectedLanguage = this.ispeakerService.selectedLanguage;
        const soundDataUrl = this.baseUrl + 'file/' + this.userId + '/conversation_menu_' + selectedLanguage + '.json';
        return new Promise((resolve, reject) => {

            this.fetchJson(soundDataUrl, (data) => {
                if (data) {
                    this.conversationMenuList = data;
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    }

    uploadConversationMenu() {
        console.log('uploading conversation menu file');
        if (this.userId) {
            const selectedLanguage = this.ispeakerService.selectedLanguage;
            for (const menu of this.conversationMenuList) {
                for (const subtopic of menu.subHeading) {
                    if (subtopic.title === this.currentType) {
                        subtopic.attempted = true;
                        let isComplete = true;
                        for (const review of this.selectedConversationType.reviews) {
                            if (!review.checked) {
                                isComplete = false;
                            }
                        }
                        subtopic.completed = isComplete;
                    }
                }
            }
            const destUrl = this.baseUrl + 'file/' + this.userId + '/conversation_menu_' + selectedLanguage + '.json';
            const jsonStr = 'jsonpCallbackFunction(' + JSON.stringify(this.conversationMenuList) + ');';
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

    saveConversationUserData() {
        const conversationUserData = new ConversationUserData();
        const studyData = this.selectedConversationType.watch_and_study.study;
        conversationUserData.watchAndStudy = {
            study: {}

        };
        conversationUserData.listen = {
            isRecording: false,
            recordedAudio: '',
            isPlaying: false

        };
        conversationUserData.watchAndStudy.study.recordedAudio = studyData.recordedAudio;
        conversationUserData.listen.recordedAudio = this.selectedConversationType.listen.recordedAudio;
        conversationUserData.practise = this.selectedConversationType.practise;
        conversationUserData.reviews = this.selectedConversationType.reviews;
        this.uploadConversationMenu();
        this.uploadConversationDataFile(conversationUserData);
    }
    fetchUserConversationDataFile() {
        const type = this.currentType.split(' ').join('_');
        // if (this.userId) {
        const destUrl = this.baseUrl + 'file/' + this.userId + '/' + type + '_' + this.ispeakerService.selectedLanguage + '.json';
        return new Promise((resolve, reject) => {

            this.fetchJson(destUrl, (data) => {
                if (data) {
                    // this.savedSoundData = data;
                    this.selectedConversationType.watch_and_study.study = data.watchAndStudy.study;
                    this.selectedConversationType.listen.recordedAudio = data.listen.recordedAudio;
                    this.selectedConversationType.practise = data.practise;
                    this.selectedConversationType.reviews = data.reviews;
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
        // }
    }
    uploadConversationDataFile(conversationUserData) {
        console.log('uploading conversationUserData file');
        if (this.userId) {
            const type = this.currentType.split(' ').join('_');
            const destUrl = this.baseUrl + 'file/' + this.userId + '/' + type + '_' + this.ispeakerService.selectedLanguage + '.json';
            const jsonStr = 'jsonpCallbackFunction(' + JSON.stringify(conversationUserData) + ');';
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
