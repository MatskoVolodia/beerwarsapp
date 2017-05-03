import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Contribution } from '../entities/contribution';

@Injectable()
export class WarService {
    constructor(
        private http: Http
    ) { }

    getTotalContribution(): Observable<Contribution> {

        return this.http.get('Apilike/GetTotalContribution')
            .map((res: Response) => {
                return <Contribution>(res.json());
            });
    }
}