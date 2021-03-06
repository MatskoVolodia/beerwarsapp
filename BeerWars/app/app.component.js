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
var auth_service_1 = require("./auth.service");
var user_1 = require("./entities/user");
var AppComponent = (function () {
    function AppComponent(authService) {
        this.authService = authService;
        this.currentUser = new user_1.User();
        this.visible = false;
        this.visibleAnimate = false;
        this.picturesUrls = new Array();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser.UserPictureUrl = 'default';
        this.authService.getCurrentUser()
            .subscribe(function (user) {
            _this.currentUser = user;
            if (!user.UserPictureUrl) {
                _this.changeSide(true);
                _this.visible = true;
                setTimeout(function () { return _this.visibleAnimate = true; });
            }
            console.log(_this.currentUser);
        });
    };
    AppComponent.prototype.changeSide = function (tf) {
        this.currentUser.WarSide = tf;
        var startIndex = tf ? 1 : 6;
        this.picturesUrls = new Array();
        this.currentUser.UserPictureUrl = "icon" + startIndex;
        for (var i = startIndex; i < startIndex + 5; i++) {
            this.picturesUrls.push("icon" + i);
        }
    };
    AppComponent.prototype.saveChanges = function () {
        var _this = this;
        this.authService.saveUserChanges(this.currentUser);
        this.visibleAnimate = false;
        setTimeout(function () { return _this.visible = false; }, 300);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        moduleId: module.id,
        templateUrl: './app.component.html',
        providers: [
            auth_service_1.AuthService
        ]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map