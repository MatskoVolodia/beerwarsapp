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
var FeedComponent = (function () {
    function FeedComponent(feedService) {
        this.feedService = feedService;
    }
    FeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.feedService.getAllPosts()
            .subscribe(function (items) { return _this.feedPosts = items; });
    };
    return FeedComponent;
}());
FeedComponent = __decorate([
    core_1.Component({
        selector: 'feed',
        moduleId: module.id,
        templateUrl: './feed.component.html',
        providers: [
            feed_service_1.FeedService
        ]
    }),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], FeedComponent);
exports.FeedComponent = FeedComponent;
//# sourceMappingURL=feed.component.js.map