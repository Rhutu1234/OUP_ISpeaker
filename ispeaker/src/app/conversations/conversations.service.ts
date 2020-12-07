import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISpeakerService } from '../ispeaker.service';
import { ConversationMenu } from './conversations.model';

@Injectable({ providedIn: 'root' })
export class ConversationsService {
    conversationMenuList: Array<ConversationMenu> = [];
    conversationData: any;
    selectedConversationType: any;
    constructor(private http: HttpClient, private ispeakerService: ISpeakerService) {

    }

    fetchConversationMenu(): Observable<any> {
        return this.http.get(environment.baseHref + 'assets/json/conversation_menu.json').pipe(map((data: any) => {
            this.conversationMenuList = data.conversationMenu;
            return this.conversationMenuList;
        }));
    }
    fetchConversationType(type): Observable<any> {
        if (!this.conversationData) {
            return this.http.get(environment.baseHref + 'assets/json/conversation_data.json').pipe(map((data: any) => {
                this.conversationData = data;
                return this.conversationData[type][this.ispeakerService.selectedLanguage];
            }));
        } else {
           return of(this.conversationData[type][this.ispeakerService.selectedLanguage]);
        }

    }
}
