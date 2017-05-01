﻿import { Component, ViewChild, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ModalComponent } from '../modal/modal.component';

import { FeedService } from './feed.service';
import { BeerService } from '../beer/beer.service';
import { AuthService } from '../auth.service';

import { Post } from '../entities/post';
import { BeerItem } from '../entities/beeritem';
import { User } from '../entities/user';
import { Like } from '../entities/like';
import { Comment } from '../entities/comment';

@Component({
    selector: 'feed',
    moduleId: module.id,
    templateUrl: './feed.component.html',
    providers: [
        FeedService,
        BeerService,
        AuthService
    ]
})
export class FeedComponent implements OnInit {
    feedPosts: Post[];
    beerItems: BeerItem[];
    model: Post = new Post();
    allLikes: Like[];
    postInModal: Post;
    commentModel: Comment = new Comment();

    @ViewChild(ModalComponent) modal: ModalComponent;

    constructor(private feedService: FeedService,
        private beerService: BeerService,
        private authService: AuthService,
        private _sanitizer: DomSanitizer,
    ) {
    }

    sendPost() {
        this.model.DateTime = new Date();
        this.model.Comments = new Array();
        this.model.Likes = new Array();

        this.feedService.sendPost(this.model)
            .subscribe(item => {
                item.DateTime = new Date(parseInt(item.DateTime.toString().substr(6)));
                item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
                item.Comments = new Array();
                item.Likes = new Array();
                this.feedPosts.unshift(item);
                console.log('Post sent');
            });
    }

    ngOnInit() {
        this.authService.getCurrentUser()
            .subscribe(user => {
                this.model.BeerItem = new BeerItem();
                this.model.BeerItem.Name = "";
                this.model.BeerRatingMark = 1;
                this.model.User = user;

                this.commentModel.User = this.model.User;

                this.model.User.UserPictureUrl = `app/icons/${this.model.User.UserPictureUrl}.png`;
                this.beerService.getAllBeers()
                    .subscribe(items => {
                        this.beerItems = items

                        this.feedService.getAllPosts()
                            .subscribe(items => {
                                this.feedPosts = items.sort((x, y) => x.DateTime <= y.DateTime ? 1 : -1);
                                for (let item of this.feedPosts) {
                                    item.DateTime = new Date(parseInt(item.DateTime.toString().substr(6)));
                                    item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
                                    item.Likes = new Array();
                                    item.Comments = new Array();
                                }

                                this.feedService.getAllLikes()
                                    .subscribe(likes => {
                                        this.allLikes = likes;
                                        this.allLikes.forEach(item => {
                                            this.feedPosts.find(post => post.Guid == item.Post.Guid)
                                                .Likes.push(item);
                                        })
                                    })
                            });
                    });
            });
    }

    autocompleListFormatter = (data: BeerItem) => {
        let html = `<span style="cursor: pointer" class='option-span'>
            <img style="width: 30px" src=${data.BeerBrand.LogoUrl} />
            ${data.BeerBrand.Name} ${data.Name} (${data.Sort}) 
        </span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    setLike(item: Post) {
        let like: Like = new Like();
        like.Post = item;
        like.User = this.model.User;
        this.feedService.setLike(like)
            .subscribe((res) => {
                item.Likes.push(res);
            });
    }

    unsetLike(item: Post) {
        let like: Like = new Like();
        like.Post = item;
        like.User = this.model.User;
        like.Guid = item.Likes.find(like => like.User.Username == this.model.User.Username).Guid;
        this.feedService.unsetLike(like)
            .subscribe(res => {
                item.Likes.splice(item.Likes.findIndex(itemlike => itemlike.Guid == res.Guid), 1);
            })
    }

    isLiked(item: Post): boolean {
        return this.feedPosts.find(post => post.Guid == item.Guid)
            .Likes.some(like => like.User.Username == this.model.User.Username);
    }

    removePost(item: Post) {
        console.log(item);
        this.feedService.removePost(item.Guid)
            .subscribe(res => {
                console.log(res);
                this.feedPosts.splice(
                    this.feedPosts.findIndex(post => post.Guid == res),
                    1
                );
            })
    }

    openCommentSection(post: Post) {
        this.postInModal = post;
        this.commentModel.Post = post;
        this.feedService.getCommentsByPostGuid(post.Guid)
            .subscribe(res => {
                this.postInModal.Comments = res;
                this.modal.show();
            });
    }

    sendComment() {
        this.commentModel.DateTime = new Date();
        this.feedService.sendComment(this.commentModel)
            .subscribe(comment => {
                this.commentModel.Post.Comments.push(comment);
            })
    }
}

