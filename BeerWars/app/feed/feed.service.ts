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

    sendPost(post: Post): Observable<Post> {
        let bodyString = JSON.stringify(post);
        console.log(bodyString);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); 

        return this.http.post('Apilike/AddNewPost', bodyString, options)
            .map((res: Response) => <Post>res.json());
    }
}