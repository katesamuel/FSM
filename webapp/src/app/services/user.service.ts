import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRouteConstants } from '../shared/constants/api.constants';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }


    public async getAll() {
        let users = this.httpClient.get(ApiRouteConstants.USERS.GETALL);
        return await firstValueFrom(users).catch(err => { throw err; });
    }

    public async getByUserId(userId: string) {
        let user = this.httpClient.get(ApiRouteConstants.USERS.GET.replace('USER_ID', userId));
        return await firstValueFrom(user).catch(err => { throw err; });
    }
}