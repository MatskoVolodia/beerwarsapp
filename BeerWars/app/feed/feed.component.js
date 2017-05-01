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
var modal_component_1 = require("../modal/modal.component");
var feed_service_1 = require("./feed.service");
var beer_service_1 = require("../beer/beer.service");
var auth_service_1 = require("../auth.service");
var post_1 = require("../entities/post");
var beeritem_1 = require("../entities/beeritem");
var like_1 = require("../entities/like");
var comment_1 = require("../entities/comment");
var FeedComponent = (function () {
    function FeedComponent(feedService, beerService, authService, _sanitizer) {
        var _this = this;
        this.feedService = feedService;
        this.beerService = beerService;
        this.authService = authService;
        this._sanitizer = _sanitizer;
        this.model = new post_1.Post();
        this.commentModel = new comment_1.Comment();
        this.itemsPerPage = 3;
        this.currentPage = 0;
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
            item.Comments = new Array();
            item.Likes = new Array();
            _this.feedPosts.unshift(item);
            console.log('Post sent');
            _this.model.BeerItem = new beeritem_1.BeerItem();
            _this.model.BeerItem.Name = "";
            _this.model.BeerRatingMark = 1;
            _this.model.Text = '';
        });
    };
    FeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getCurrentUser()
            .subscribe(function (user) {
            _this.model.BeerItem = new beeritem_1.BeerItem();
            _this.model.BeerItem.Name = "";
            _this.model.BeerRatingMark = 1;
            _this.model.User = user;
            _this.commentModel.User = _this.model.User;
            _this.model.User.UserPictureUrl = "app/icons/" + _this.model.User.UserPictureUrl + ".png";
            _this.beerService.getAllBeers()
                .subscribe(function (items) {
                _this.beerItems = items;
                _this.feedService.getPostsOnPage(_this.currentPage, _this.itemsPerPage)
                    .subscribe(function (items) {
                    _this.feedPosts = items;
                    for (var _i = 0, _a = _this.feedPosts; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.DateTime = new Date(parseInt(item.DateTime.toString().substr(6)));
                        item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
                        item.Likes = new Array();
                        item.Comments = new Array();
                    }
                    _this.feedService.getLikesByPostGuids(_this.feedPosts.map(function (item) { return item.Guid; }))
                        .subscribe(function (likes) {
                        likes.forEach(function (item) {
                            _this.feedPosts.find(function (post) { return post.Guid == item.Post.Guid; })
                                .Likes.push(item);
                        });
                    });
                });
            });
        });
    };
    FeedComponent.prototype.setLike = function (item) {
        var like = new like_1.Like();
        like.Post = item;
        like.User = this.model.User;
        this.feedService.setLike(like)
            .subscribe(function (res) {
            item.Likes.push(res);
        });
    };
    FeedComponent.prototype.unsetLike = function (item) {
        var _this = this;
        var like = new like_1.Like();
        like.Post = item;
        like.User = this.model.User;
        like.Guid = item.Likes.find(function (like) { return like.User.Username == _this.model.User.Username; }).Guid;
        this.feedService.unsetLike(like)
            .subscribe(function (res) {
            item.Likes.splice(item.Likes.findIndex(function (itemlike) { return itemlike.Guid == res.Guid; }), 1);
        });
    };
    FeedComponent.prototype.isLiked = function (item) {
        var _this = this;
        return this.feedPosts.find(function (post) { return post.Guid == item.Guid; })
            .Likes.some(function (like) { return like.User.Username == _this.model.User.Username; });
    };
    FeedComponent.prototype.removePost = function (item) {
        var _this = this;
        console.log(item);
        this.feedService.removePost(item.Guid)
            .subscribe(function (res) {
            console.log(res);
            _this.feedPosts.splice(_this.feedPosts.findIndex(function (post) { return post.Guid == res; }), 1);
        });
    };
    FeedComponent.prototype.openCommentSection = function (post) {
        var _this = this;
        this.postInModal = post;
        this.commentModel.Post = post;
        this.feedService.getCommentsByPostGuid(post.Guid)
            .subscribe(function (res) {
            _this.postInModal.Comments = res;
            _this.postInModal.Comments.forEach(function (item) {
                item.DateTime = new Date(parseInt(item.DateTime.toString().substr(6)));
                item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
            });
            _this.postInModal.Comments =
                _this.postInModal.Comments.sort(function (x, y) { return x.DateTime <= y.DateTime ? 1 : -1; });
            _this.modal.show();
        });
    };
    FeedComponent.prototype.sendComment = function (event) {
        var _this = this;
        if (event.keyCode == 13) {
            this.commentModel.DateTime = new Date();
            this.feedService.sendComment(this.commentModel)
                .subscribe(function (comment) {
                comment.DateTime = new Date(parseInt(comment.DateTime.toString().substr(6)));
                _this.commentModel.Post.Comments.unshift(comment);
            });
            this.commentModel.Text = '';
        }
    };
    FeedComponent.prototype.showPrevious = function () {
        var _this = this;
        this.currentPage = this.currentPage + 1;
        this.feedService.getPostsOnPage(this.currentPage, this.itemsPerPage)
            .subscribe(function (items) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                item.DateTime = new Date(parseInt(item.DateTime.toString().substr(6)));
                item.User.UserPictureUrl = 'app/icons/' + item.User.UserPictureUrl + '.png';
                item.Likes = new Array();
                item.Comments = new Array();
                _this.feedPosts.push(item);
            }
            _this.feedService.getLikesByPostGuids(items.map(function (item) { return item.Guid; }))
                .subscribe(function (likes) {
                likes.forEach(function (item) {
                    _this.feedPosts.find(function (post) { return post.Guid == item.Post.Guid; })
                        .Likes.push(item);
                });
            });
        });
    };
    return FeedComponent;
}());
__decorate([
    core_1.ViewChild(modal_component_1.ModalComponent),
    __metadata("design:type", modal_component_1.ModalComponent)
], FeedComponent.prototype, "modal", void 0);
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