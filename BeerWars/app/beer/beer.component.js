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
            console.log(items);
            _this.beerItems.forEach(function (item) { return item.Rating = 0; });
            _this.filterItems = _this.generateFilterItems();
            _this.beerBrands = _this.getUniqueBeerBrands();
            _this.currentItems = _this.beerItems;
            _this.beerService.getBeerRatings()
                .subscribe(function (ratings) {
                ratings.forEach(function (rate) {
                    _this.beerItems.find(function (beer) { return beer.Guid === rate.BeerItemGuid; })
                        .Rating = rate.Rating / 2;
                });
            });
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
        this.topLightDarkFilters[0] = false;
        filter.checked = !filter.checked;
        this.refilter();
    };
    BeerComponent.prototype.refilter = function () {
        var _this = this;
        this.currentItems = new Array();
        if (this.filterItems.every(function (item) { return !item.checked; })) {
            this.currentItems = this.beerItems.filter(function (beer) { return _this.matchesSortFilter(beer); });
        }
        else {
            this.currentItems = this.beerItems
                .filter(function (beer) { return _this.matchesSortFilter(beer) && _this.matchesBrandFilter(beer); });
        }
    };
    BeerComponent.prototype.matchesSortFilter = function (item) {
        if (this.topLightDarkFilters[1] && this.topLightDarkFilters[2]) {
            return true;
        }
        if (this.topLightDarkFilters[1] || this.topLightDarkFilters[2]) {
            return item.Sort === (this.topLightDarkFilters[1] ? 'Light' : 'Dark');
        }
        return true;
    };
    BeerComponent.prototype.matchesBrandFilter = function (item) {
        return this.filterItems.find(function (fitem) { return fitem.filter === item.BeerBrand.Name; }).checked;
    };
    BeerComponent.prototype.changeSpecificFilter = function (index) {
        if (index === 1 || index === 2) {
            this.topLightDarkFilters[0] = false;
            this.topLightDarkFilters[index] = !this.topLightDarkFilters[index];
            this.refilter();
        }
        else {
            if (this.topLightDarkFilters[0]) {
                this.topLightDarkFilters[0] = false;
                this.refilter();
            }
            else {
                this.topLightDarkFilters[0] = true;
                this.topLightDarkFilters[1] = false;
                this.topLightDarkFilters[2] = false;
                this.filterItems.forEach(function (item) { return item.checked = false; });
                this.currentItems = this.beerItems
                    .sort(function (x, y) { return x.Rating <= y.Rating ? 1 : -1; })
                    .slice(0, 5);
            }
        }
    };
    BeerComponent.prototype.getUniqueBeerBrands = function () {
        return this.beerItems.map(function (item) { return item.BeerBrand; })
            .filter(function (value, index, self) {
            return self.findIndex(function (item) { return item.Name === value.Name; }) === index;
        });
    };
    BeerComponent.prototype.removeBeerItem = function (item) {
        var _this = this;
        this.beerService.removeBeerItem(item.Guid)
            .subscribe(function (guid) {
            var beerBrandName = _this.beerItems.find(function (item) { return item.Guid == guid; }).BeerBrand.Name;
            _this.beerItems.splice(_this.beerItems.findIndex(function (item) { return item.Guid == guid; }), 1);
            _this.currentItems.splice(_this.currentItems.findIndex(function (item) { return item.Guid == guid; }), 1);
            var wasLast = !_this.beerItems.some(function (item) { return item.BeerBrand.Name === beerBrandName; });
            if (wasLast) {
                _this.beerBrands.splice(_this.beerBrands.findIndex(function (item) { return item.Name === beerBrandName; }), 1);
                _this.filterItems.splice(_this.filterItems.findIndex(function (item) { return item.filter === beerBrandName; }), 1);
            }
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