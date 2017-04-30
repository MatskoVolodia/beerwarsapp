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
var platform_browser_1 = require("@angular/platform-browser");
var feed_service_1 = require("./feed.service");
var beer_service_1 = require("../beer/beer.service");
var auth_service_1 = require("../auth.service");
var post_1 = require("../entities/post");
var beeritem_1 = require("../entities/beeritem");
var FeedComponent = (function () {
    function FeedComponent(feedService, beerService, authService, _sanitizer) {
        var _this = this;
        this.feedService = feedService;
        this.beerService = beerService;
        this.authService = authService;
        this._sanitizer = _sanitizer;
        this.autocompleListFormatter = function (data) {
            var html = "<span style=\"cursor: pointer\" class='option-span'>\n            <img style=\"width: 30px\" src=" + data.BeerBrand.LogoUrl + " />\n            " + data.BeerBrand.Name + " " + data.Name + " (" + data.Sort + ") \n        </span>";
            return _this._sanitizer.bypassSecurityTrustHtml(html);
        };
    }
    FeedComponent.prototype.sendPost = function () {
        var _this = this;
        this.model.DateTime = new Date();
        this.model.Comments = new Array();
        this.model.Likes = new Array();
        this.feedService.sendPost(this.model)
            .subscribe(function (item) {
            item.DateTime = new Date(parseInt(item.DateTime.toString().substr(6)));
            item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
            _this.feedPosts.unshift(item);
            console.log('Post sent');
        });
    };
    FeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getCurrentUser()
            .subscribe(function (user) {
            _this.model.User = user;
            _this.beerService.getAllBeers()
                .subscribe(function (items) {
                _this.beerItems = items;
                _this.feedService.getAllPosts()
                    .subscribe(function (items) {
                    _this.feedPosts = items.sort(function (x, y) { return x.DateTime <= y.DateTime ? 1 : -1; });
                    for (var _i = 0, _a = _this.feedPosts; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.DateTime = new Date(parseInt(item.DateTime.toString().substr(6)));
                        item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
                    }
                });
            });
        });
        this.model = new post_1.Post();
        this.model.BeerItem = new beeritem_1.BeerItem();
        this.model.BeerItem.Name = "";
        this.model.BeerRatingMark = 1;
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
        auth_service_1.AuthService,
        platform_browser_1.DomSanitizer])
], FeedComponent);
exports.FeedComponent = FeedComponent;
//# sourceMappingURL=feed.component.js.map