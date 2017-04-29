import { Component, OnInit } from '@angular/core';

import { FeedService } from './feed.service';
import { BeerService } from '../beer/beer.service';

import { Post } from '../entities/post';
import { BeerItem } from '../entities/beeritem';
import { User } from '../entities/user';

@Component({
    selector: 'feed',
    moduleId: module.id,
    templateUrl: './feed.component.html',
    providers: [
        FeedService,
        BeerService
    ]
})
export class FeedComponent implements OnInit {
    feedPosts: Post[];
    beerItems: BeerItem[];
    model: Post;

    constructor(private feedService: FeedService,
        private beerService: BeerService
    ) {
        this.model = new Post();
        this.model.User = new User();
        this.model.User.Username = 'admin'; //mock
        this.model.BeerItem = new BeerItem();
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
            .subscribe(items => this.feedPosts = items);
        this.beerService.getAllBeers()
            .subscribe(items => this.beerItems = items);
    }
}