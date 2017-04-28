import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post } from '../entities/post';

@Injectable()
export class FeedService {
    constructor(
        private http: Http
    ) { }

    getAllPosts(): Observable<Post[]> {
        return this.http.get('Apilike/GetAllPosts')
            .map(res => <Post[]>res.json());
    }
}