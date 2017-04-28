import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../entities/user';

@Injectable()
export class ProfileService {
    constructor(
        private http: Http
    ) { }

    getUser(username: string): Observable<User> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('username', username);

        return this.http.get('Apilike/GetUserInformation', { search: params })
            .map((res: Response) => {
                return <User>(res.json());
            });
    }
}