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
var war_service_1 = require("./war.service");
var contribution_1 = require("../entities/contribution");
var WarComponent = (function () {
    function WarComponent(warService) {
        this.warService = warService;
        this.totalContribution = new contribution_1.Contribution;
    }
    WarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.warService.getTotalContribution()
            .subscribe(function (contr) {
            _this.totalContribution = contr;
        });
    };
    return WarComponent;
}());
WarComponent = __decorate([
    core_1.Component({
        selector: 'war',
        moduleId: module.id,
        templateUrl: './war.component.html',
        providers: [
            war_service_1.WarService
        ]
    }),
    __metadata("design:paramtypes", [war_service_1.WarService])
], WarComponent);
exports.WarComponent = WarComponent;
//# sourceMappingURL=war.component.js.map