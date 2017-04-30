import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

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
        private authService: AuthService,
        private _sanitizer: DomSanitizer
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
                this.feedPosts.unshift(item);
                console.log('Post sent');
            });
    }

    ngOnInit() {
        this.authService.getCurrentUser()
            .subscribe(user => {
                this.model.User = user;
                this.beerService.getAllBeers()
                    .subscribe(items => {
                        this.beerItems = items

                        this.feedService.getAllPosts()
                            .subscribe(items => {
                                this.feedPosts = items.sort((x, y) => x.DateTime <= y.DateTime ? 1 : -1);
                                for (let item of this.feedPosts) {
                                    item.DateTime = new Date(parseInt(item.DateTime.toString().substr(6)));
                                    item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
                                }
                            });
                    });
            });

        this.model = new Post();
        this.model.BeerItem = new BeerItem();
        this.model.BeerItem.Name = "";
        this.model.BeerRatingMark = 1;
    }

    autocompleListFormatter = (data: BeerItem) => {
        let html = `<span style="cursor: pointer" class='option-span'>
            <img style="width: 30px" src=${data.BeerBrand.LogoUrl} />
            ${data.BeerBrand.Name} ${data.Name} (${data.Sort}) 
        </span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

}