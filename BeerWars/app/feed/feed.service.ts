import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post } from '../entities/post';
import { Like } from '../entities/like';
import { Comment } from '../entities/comment';

@Injectable()
export class FeedService {
    constructor(
        private http: Http
    ) { }

    getAllPosts(): Observable<Post[]> {
        return this.http.get('Apilike/GetAllPosts')
            .map(res => <Post[]>res.json());
    }

    getPostsOnPage(page: number, itemsPerPage: number): Observable<Post[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page.toString());
        params.set('itemsPerPage', itemsPerPage.toString());

        return this.http.get('Apilike/GetPostsOnPage', { search: params })
            .map((res: Response) => {
                return <Post[]>(res.json());
            });
    }

    getAllLikes(): Observable<Like[]> {
        return this.http.get('Apilike/GetAllLikes')
            .map(res => <Like[]>res.json());
    }

    getLikesByPostGuids(guids: string[]): Observable<Like[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('postsGuids', JSON.stringify(guids));

        return this.http.get('Apilike/GetLikesByPostGuids', { search: params })
            .map((res: Response) => {
                return <Like[]>(res.json());
            });
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

    sendComment(comment: Comment): Observable<Comment> {
        let bodyString = JSON.stringify(comment);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('Apilike/AddNewComment', bodyString, options)
            .map((res: Response) => <Comment>res.json());
    }

    getCommentsByPostGuid(postGuid: string): Observable<Comment[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('postGuid', postGuid);

        return this.http.get('Apilike/GetCommentsByPostGuid', { search: params })
            .map((res: Response) => {
                console.log(res);
                return <Comment[]>(res.json());
            });
    }
}