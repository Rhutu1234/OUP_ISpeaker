import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISpeakerService } from '../ispeaker.service';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class SoundsService {
    selectedSound: any;
    selectedSoundDetails: any;
    soundsData: any;
    selectedLanguage: string;
    soundMenu: any;;
    constructor(private http: HttpClient, private ispeakerService: ISpeakerService) { }

    fetchSoundMenu(): Observable<any> {
        if (!this.soundMenu && !this.soundsData) {
            return forkJoin(
                this.http.get(environment.baseHref + 'assets/json/soundsMenu.json').pipe(map((data) => {
                    this.soundMenu = data;
                    return data[this.ispeakerService.selectedLanguage];
                })),
                this.http.get(environment.baseHref + 'assets/json/sound_data.json').pipe(map((data) => {
                    this.selectedLanguage = this.ispeakerService.selectedLanguage;
                    this.soundsData = data;
                    return data;
                }))
            );
        } else {
            return of([this.soundMenu[this.ispeakerService.selectedLanguage], this.soundsData]);
        }

    }

    getSoundDetails() {
        for (const sound of this.soundsData.sounds) {
            if (sound.phoneme === this.selectedSound.phoneme) {
                this.selectedSoundDetails = sound;
                return false;
            }
        }
    }
}
