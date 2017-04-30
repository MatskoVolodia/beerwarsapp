"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var feed_service_1 = require("./feed.service");
var beer_service_1 = require("../beer/beer.service");
var auth_service_1 = require("../auth.service");
var post_1 = require("../entities/post");
var beeritem_1 = require("../entities/beeritem");
var FeedComponent = (function () {
    function FeedComponent(feedService, beerService, authService) {
        this.feedService = feedService;
        this.beerService = beerService;
        this.authService = authService;
    }
    FeedComponent.prototype.sendPost = function () {
        var _this = this;
        this.model.DateTime = new Date();
        console.log(this.model.DateTime);
        this.feedService.sendPost(this.model)
            .subscribe(function (item) {
            _this.feedPosts.unshift(item);
            console.log('Post sent');
        });
    };
    FeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.feedService.getAllPosts()
            .subscribe(function (items) {
            _this.feedPosts = items.sort(function (x, y) { return x.DateTime <= y.DateTime ? 1 : -1; });
            for (var _i = 0, _a = _this.feedPosts; _i < _a.length; _i++) {
                var item = _a[_i];
                item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
            }
        });
        this.beerService.getAllBeers()
            .subscribe(function (items) { return _this.beerItems = items; });
        this.model = new post_1.Post();
        this.authService.getCurrentUser()
            .subscribe(function (user) { return _this.model.User = user; });
        this.model.BeerItem = new beeritem_1.BeerItem();
    };
    return FeedComponent;
}());
FeedComponent = __decorate([
    core_1.Component({
        selector: 'feed',
        moduleId: module.id,
        templateUrl: './feed.component.html',
        providers: [
            feed_service_1.FeedService,
            beer_service_1.BeerService,
            auth_service_1.AuthService
        ]
    }),
    __metadata("design:paramtypes", [feed_service_1.FeedService,
        beer_service_1.BeerService,
        auth_service_1.AuthService])
], FeedComponent);
exports.FeedComponent = FeedComponent;
//# sourceMappingURL=feed.component.js.map