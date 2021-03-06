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
var http_1 = require("@angular/http");
var FeedService = (function () {
    function FeedService(http) {
        this.http = http;
    }
    FeedService.prototype.getAllPosts = function () {
        return this.http.get('Apilike/GetAllPosts')
            .map(function (res) { return res.json(); });
    };
    FeedService.prototype.getPostsOnPage = function (page, itemsPerPage) {
        var params = new http_1.URLSearchParams();
        params.set('page', page.toString());
        params.set('itemsPerPage', itemsPerPage.toString());
        return this.http.get('Apilike/GetPostsOnPage', { search: params })
            .map(function (res) {
            return (res.json());
        });
    };
    FeedService.prototype.getAllLikes = function () {
        return this.http.get('Apilike/GetAllLikes')
            .map(function (res) { return res.json(); });
    };
    FeedService.prototype.getLikesByPostGuids = function (guids) {
        var params = new http_1.URLSearchParams();
        params.set('postsGuids', JSON.stringify(guids));
        return this.http.get('Apilike/GetLikesByPostGuids', { search: params })
            .map(function (res) {
            return (res.json());
        });
    };
    FeedService.prototype.sendPost = function (post) {
        var bodyString = JSON.stringify(post);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('Apilike/AddNewPost', bodyString, options)
            .map(function (res) { return res.json(); });
    };
    FeedService.prototype.setLike = function (like) {
        var bodyString = JSON.stringify(like);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('Apilike/Like', bodyString, options)
            .map(function (res) { return res.json(); });
    };
    FeedService.prototype.unsetLike = function (like) {
        var bodyString = JSON.stringify(like);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('Apilike/Dislike', bodyString, options)
            .map(function (res) { return res.json(); });
    };
    FeedService.prototype.removePost = function (postGuid) {
        var bodyString = JSON.stringify({
            postGuid: postGuid
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('Apilike/RemovePost', bodyString, options)
            .map(function (res) {
            return res.json();
        });
    };
    FeedService.prototype.sendComment = function (comment) {
        var bodyString = JSON.stringify(comment);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('Apilike/AddNewComment', bodyString, options)
            .map(function (res) { return res.json(); });
    };
    FeedService.prototype.getCommentsByPostGuid = function (postGuid) {
        var params = new http_1.URLSearchParams();
        params.set('postGuid', postGuid);
        return this.http.get('Apilike/GetCommentsByPostGuid', { search: params })
            .map(function (res) {
            console.log(res);
            return (res.json());
        });
    };
    return FeedService;
}());
FeedService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FeedService);
exports.FeedService = FeedService;
//# sourceMappingURL=feed.service.js.map