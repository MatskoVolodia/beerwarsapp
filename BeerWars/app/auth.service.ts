import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from './entities/user';

@Injectable()
export class AuthService {
    constructor(
        private http: Http
    ) { }

    getCurrentUser(): Observable<User> {
        return this.http.get('Apilike/GetCurrentUser')
            .map(res => <User>res.json());
    }
}