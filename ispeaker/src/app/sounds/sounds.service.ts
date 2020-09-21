import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISpeakerService } from '../ispeaker.service';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class SoundsService {
    selectedSound: any;
    selectedSoundDetails: any;
    soundsData: any;
    constructor(private http: HttpClient, private ispeakerService: ISpeakerService) { }

    fetchSoundMenu(): Observable<any> {
        return forkJoin(
            this.http.get(environment.baseHref + 'assets/json/soundsMenu.json').pipe(map((data) => {
                return data[this.ispeakerService.selectedLanguage];
            })),
            this.http.get(environment.baseHref + 'assets/json/sound_data.json').pipe(map((data) => {
                this.soundsData = data;
                return data;
            }))
        );

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
