import { Component, OnInit } from '@angular/core';

import { FeedService } from './feed.service';
import { BeerService } from '../beer/beer.service';
import { AuthService } from '../auth.service';

import { Post } from '../entities/post';
import { BeerItem } from '../entities/beeritem';
import { User } from '../entities/user';

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
    model: Post;

    constructor(private feedService: FeedService,
        private beerService: BeerService,
        private authService: AuthService
    ) {
    }

    sendPost() {
        this.model.DateTime = new Date();
        console.log(this.model.DateTime);
        this.feedService.sendPost(this.model)
            .subscribe(item => {
                this.feedPosts.unshift(item);
                console.log('Post sent');
            });
    }

    ngOnInit() {
        this.feedService.getAllPosts()
            .subscribe(items => {
                this.feedPosts = items.sort((x, y) => x.DateTime <= y.DateTime ? 1 : -1);
                for (let item of this.feedPosts) {
                    item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
                }
            });
        this.beerService.getAllBeers()
            .subscribe(items => this.beerItems = items);
        this.model = new Post();
        this.authService.getCurrentUser()
            .subscribe(user => this.model.User = user);
        this.model.BeerItem = new BeerItem();
    }
}