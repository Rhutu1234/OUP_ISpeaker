import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISpeakerService } from '../ispeaker.service';
import { map } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Practise, Sound, SoundData } from './sound.model';
@Injectable({ providedIn: 'root' })
export class SoundsService {
    selectedSound: any;
    selectedSoundDetails: any;
    soundsData: any;
    selectedLanguage: string;
    soundMenu: any;
    savedSoundData = new SoundData();
    // tslint:disable-next-line:no-string-literal
    userId = window['userId'];
    baseUrl = '';


    constructor(private http: HttpClient, private ispeakerService: ISpeakerService, private meta: Meta) {
        if (this.userId) {
            // tslint:disable-next-line:no-string-literal
            this.baseUrl = window['oldoApi']._baseUrl + 'fileapi/v1/';
        }
    }

    fetchSoundMenu(): Observable<any> {
        this.selectedLanguage = this.ispeakerService.selectedLanguage;

        if (!this.soundMenu && !this.soundsData) {
            return forkJoin(
                this.http.get(environment.baseHref + 'assets/json/soundsMenu.json').pipe(map((data) => {
                    this.soundMenu = data;
                    return data[this.ispeakerService.selectedLanguage];
                })),
                this.http.get(environment.baseHref + 'assets/json/sound_data.json').pipe(map((data) => {
                    this.soundsData = data;
                    return data;
                }))
            );
        } else {
            return of([this.soundMenu[this.ispeakerService.selectedLanguage], this.soundsData]);
        }


    }
    updateSoundDataCustom(data) {
        // for (let sound of data.sounds) {
        //     let britishQues = sound.BrE.listen_and_record.questions;
        //     let americanQues = sound.AmE.listen_and_record.questions;
        //     for (let i = 1; i < britishQues.length; i++) {
        //         let word = britishQues[0].word;
        //         var res = britishQues[i].word.replace(word, "").trim();
        //         res = res.split(" ");
        //         res = res.join(" &ndash; ")
        //         britishQues[i].word = res;
        //     }
        //     for (let j = 1; j < americanQues.length; j++) {
        //         let word = americanQues[0].word;
        //         var res = americanQues[j].word.replace(word, "").trim();
        //         res = res.split(" ");
        //         res = res.join(" &ndash; ")
        //         americanQues[j].word = res;
        //     }
        // }
        // console.log(JSON.stringify(data));

    }
    getSoundDetails() {
        for (const sound of this.soundsData.sounds) {
            if (sound.phoneme === this.selectedSound.phoneme) {
                this.selectedSoundDetails = sound;
                return false;
            }
        }
    }
    updateSoundData(sound) {
        // for (const sound of this.savedSoundData.sounds) {
        const soundDetail = _.find(this.soundsData.sounds, { phoneme: sound.phoneme });
        soundDetail[this.selectedLanguage].listen_and_record = sound[this.selectedLanguage].listen_and_record;
        soundDetail[this.selectedLanguage].currentSet = sound[this.selectedLanguage].currentSet;
        sound[this.selectedLanguage].practice.forEach((set, index) => {
            if (soundDetail[this.selectedLanguage].practice[index].set === set.set) {
                soundDetail[this.selectedLanguage].practice[index].score = set.score;
            }
        });
        soundDetail[this.selectedLanguage].review = sound[this.selectedLanguage].review;

        //  }
    }
    fetchExistingSoundData() {
        // const url = this.baseUrl + 'info/' + this.userId + '/';
        // this.http.get(url).subscribe((data: any) => {
        //     let isFilePresent = false;
        //     for (const fileDetail of data) {
        //         const n = fileDetail[0].indexOf('sound_new_data.json');
        //         if (n !== (-1)) {
        //             isFilePresent = true;
        //             break;
        //         }
        //     }
        //     if (!isFilePresent) {
        //         //this.uploadSoundDataFile();
        //     } else {
        //         this.fetchSoundDataFile().then(() => { }, () => { });
        //     }

        // });
    }
    uploadSoundDataFile(soundData) {
        console.log('uploading sound file');
        if (this.userId) {
            const destUrl = this.baseUrl + 'file/' + this.userId + '/sound_' + soundData.phoneme + '_' + this.selectedLanguage + '.json';
            const jsonStr = 'jsonpCallbackFunction(' + JSON.stringify(soundData) + ');';
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
    fetchSoundDataFile() {
        const soundDataUrl =
            this.baseUrl + 'file/' + this.userId + '/sound_' + this.selectedSound.phoneme + '_' + this.selectedLanguage + '.json';;
        return new Promise((resolve, reject) => {

            this.fetchJson(soundDataUrl, (data) => {
                if (data) {
                    // this.savedSoundData = data;
                    this.updateSoundData(data);
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    }
    saveSoundData() {
        console.log('save data');
        const selectedSoundDetails = this.selectedSoundDetails[this.selectedLanguage];
        const soundData = new Sound();
        soundData.phoneme = this.selectedSoundDetails.phoneme;
        soundData[this.selectedLanguage].listen_and_record = selectedSoundDetails.listen_and_record;
        soundData[this.selectedLanguage].currentSet = selectedSoundDetails.currentSet;
        soundData[this.selectedLanguage].practice = [];
        for (const set of selectedSoundDetails.practice) {
            const practObj = new Practise();
            practObj.score = set.score;
            practObj.set = set.set;
            soundData[this.selectedLanguage].practice.push(practObj);
        }
        soundData[this.selectedLanguage].review = selectedSoundDetails.review;
        this.updateSoundMenu();
        this.uploadSoundDataFile(soundData);

    }

    updateSoundMenu() {
        const selectedSoundDetails = this.selectedSoundDetails[this.selectedLanguage];
        let upload = false;
        let currentSound;
        for (const i in this.soundMenu[this.selectedLanguage]) {
            if (this.soundMenu[this.selectedLanguage][i]) {
                currentSound = _.find(this.soundMenu[this.selectedLanguage][i], { phoneme: this.selectedSound.phoneme });
                // console.log(currentSound);
                if (currentSound) {
                    currentSound.attempted = true;
                    currentSound.completed = selectedSoundDetails.review;
                    upload = selectedSoundDetails.review;
                    break;
                }
            }

        }
        // if (upload || (currentSound && !currentSound.attempted)) {
        this.uploadSoundMenu();
        // }
    }

    uploadSoundMenu() {
        console.log('uploading sound menu file');
        if (this.userId) {
            const destUrl = this.baseUrl + 'file/' + this.userId + '/soundMenu.json';
            const jsonStr = 'jsonpCallbackFunction(' + JSON.stringify(this.soundMenu) + ');';
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
    fetchExistingSoundMenu() {
        const soundDataUrl = this.baseUrl + 'file/' + this.userId + '/soundMenu.json';
        return new Promise((resolve, reject) => {

            this.fetchJson(soundDataUrl, (data) => {
                if (data) {
                    this.soundMenu = data;
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
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
