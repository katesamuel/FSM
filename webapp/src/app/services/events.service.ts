import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRouteConstants } from '../shared/constants/api.constants';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }


    public async getAll() {
        let events = this.httpClient.get(ApiRouteConstants.EVENTS.GETALL);
        return await firstValueFrom(events).catch(err => { throw err; });
    }

    public async getByEventId(eventId: string) {
        let event = this.httpClient.get(ApiRouteConstants.EVENTS.GET.replace('EVENT_ID', eventId));
        return await firstValueFrom(event).catch(err => { throw err; });
    }
}