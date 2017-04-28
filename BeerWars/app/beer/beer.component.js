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
var beer_service_1 = require("./beer.service");
var beeritem_1 = require("../entities/beeritem");
var beerbrand_1 = require("../entities/beerbrand");
var BeerComponent = (function () {
    function BeerComponent(beerService) {
        this.beerService = beerService;
        this.model = new beeritem_1.BeerItem();
        this.model.BeerBrand = new beerbrand_1.BeerBrand();
        this.beerItems = new Array();
    }
    BeerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.beerService.getAllBeers()
            .subscribe(function (items) { return _this.beerItems = items; });
    };
    BeerComponent.prototype.addNewBeer = function () {
        var _this = this;
        this.beerService.addNewBeer(this.model)
            .subscribe(function (item) {
            _this.beerItems.push(item);
        });
        console.log('Beer added');
    };
    return BeerComponent;
}());
BeerComponent = __decorate([
    core_1.Component({
        selector: 'beer',
        moduleId: module.id,
        templateUrl: './beer.component.html',
        providers: [
            beer_service_1.BeerService
        ]
    }),
    __metadata("design:paramtypes", [beer_service_1.BeerService])
], BeerComponent);
exports.BeerComponent = BeerComponent;
//# sourceMappingURL=beer.component.js.map