import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post } from '../entities/post';
import { Like } from '../entities/like';

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
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers }); 

        return this.http.post('Apilike/AddNewPost', bodyString, options)
            .map((res: Response) => <Post>res.json());
    }

    setLike(like: Like): Observable<Like> {
        let bodyString = JSON.stringify(like);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('Apilike/Like', bodyString, options)
            .map((res: Response) => <Like>res.json());
    }

    unsetLike(like: Like): Observable<Like> {
        let bodyString = JSON.stringify(like);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('Apilike/Dislike', bodyString, options)
            .map((res: Response) => <Like>res.json());
    }

    removePost(postGuid: string): Observable<string> {
        let bodyString = JSON.stringify({
            postGuid: postGuid
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('Apilike/RemovePost', bodyString, options)
            .map((res: Response) => {
                return res.json();
            });
    }
}