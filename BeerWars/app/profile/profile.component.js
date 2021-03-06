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
var profile_service_1 = require("./profile.service");
var auth_service_1 = require("../auth.service");
var user_1 = require("../entities/user");
var rankitem_1 = require("../entities/rankitem");
var contribution_1 = require("../entities/contribution");
var ProfileComponent = (function () {
    function ProfileComponent(profileService, authService) {
        this.profileService = profileService;
        this.authService = authService;
        this.user = new user_1.User();
        this.ranks = new Array();
        this.usersContribution = new contribution_1.Contribution();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getCurrentUser()
            .subscribe(function (user) {
            _this.user = user;
            _this.profileService.getUsersContribution(_this.user.Username)
                .subscribe(function (res) {
                _this.usersContribution = res;
                _this.userrank = _this.user.WarSide ?
                    _this.usersContribution.LightSide :
                    _this.usersContribution.DarkSide;
            });
            _this.ranks = _this.user.WarSide ?
                rankitem_1.RankItemDefinitions.LightSide :
                rankitem_1.RankItemDefinitions.DarkSide;
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        moduleId: module.id,
        templateUrl: './profile.component.html',
        providers: [
            profile_service_1.ProfileService,
            auth_service_1.AuthService
        ]
    }),
    __metadata("design:paramtypes", [profile_service_1.ProfileService,
        auth_service_1.AuthService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map