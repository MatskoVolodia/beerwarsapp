import { Component, OnInit } from '@angular/core';

import { FeedService } from './feed.service';

import { Post } from '../entities/post';

@Component({
    selector: 'feed',
    moduleId: module.id,
    templateUrl: './feed.component.html',
    providers: [
        FeedService
    ]
})
export class FeedComponent implements OnInit {
    feedPosts: Post[];

    constructor(private feedService: FeedService) {
    }

    ngOnInit() {
        this.feedService.getAllPosts()
            .subscribe(items => this.feedPosts = items);
    }
}