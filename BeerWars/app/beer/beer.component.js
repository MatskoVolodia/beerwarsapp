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
var beer_service_1 = require("./beer.service");
var beeritem_1 = require("../entities/beeritem");
var beerbrand_1 = require("../entities/beerbrand");
var filteritem_1 = require("../entities/filteritem");
var BeerComponent = (function () {
    function BeerComponent(beerService, _sanitizer) {
        var _this = this;
        this.beerService = beerService;
        this._sanitizer = _sanitizer;
        this.beerSorts = ['Light', 'Dark'];
        this.brandCreation = false;
        this.topLightDarkFilters = [false, false, false];
        this.autocompleListFormatter = function (data) {
            var html = "<span style=\"cursor: pointer\" class='option-span'>\n            <img style=\"width: 30px\" src=" + data.LogoUrl + " />\n            " + data.Name + " \n        </span>";
            return _this._sanitizer.bypassSecurityTrustHtml(html);
        };
        this.autocompleteSortFormatter = function (data) {
            var html = "<span style=\"cursor: pointer\" class='option-span'>" + data + "</span>";
            return _this._sanitizer.bypassSecurityTrustHtml(html);
        };
        this.model = new beeritem_1.BeerItem();
        this.model.BeerBrand = new beerbrand_1.BeerBrand();
        this.model.BeerBrand.Name = "";
        this.beerItems = new Array();
    }
    BeerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.beerService.getAllBeers()
            .subscribe(function (items) {
            _this.beerItems = items;
            _this.filterItems = _this.generateFilterItems();
            _this.beerBrands = _this.getUniqueBeerBrands();
        });
    };
    BeerComponent.prototype.addNewBeer = function () {
        var _this = this;
        this.beerService.addNewBeer(this.model)
            .subscribe(function (item) {
            _this.beerItems.push(item);
            console.log('Beer added');
        });
    };
    BeerComponent.prototype.generateFilterItems = function () {
        return this.beerItems.map(function (item) { return item.BeerBrand.Name; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; })
            .map(function (item) {
            var temp = new filteritem_1.FilterItem();
            temp.filter = item;
            temp.checked = false;
            return temp;
        });
    };
    BeerComponent.prototype.changeFilterState = function (filter) {
        filter.checked = !filter.checked;
    };
    BeerComponent.prototype.changeSpecificFilter = function (index) {
        this.topLightDarkFilters[index] = !this.topLightDarkFilters[index];
    };
    BeerComponent.prototype.getUniqueBeerBrands = function () {
        return this.beerItems.map(function (item) { return item.BeerBrand; })
            .filter(function (value, index, self) {
            return self.findIndex(function (item) { return item.Name === value.Name; }) === index;
        });
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
    __metadata("design:paramtypes", [beer_service_1.BeerService,
        platform_browser_1.DomSanitizer])
], BeerComponent);
exports.BeerComponent = BeerComponent;
//# sourceMappingURL=beer.component.js.map