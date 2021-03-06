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
var BeerService = (function () {
    function BeerService(http) {
        this.http = http;
    }
    BeerService.prototype.getAllBeers = function () {
        return this.http.get('Apilike/GetAllBeers')
            .map(function (res) { return res.json(); });
    };
    BeerService.prototype.addNewBeer = function (beerItem) {
        var bodyString = JSON.stringify(beerItem);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('Apilike/AddNewBeer', bodyString, options)
            .map(function (res) { return res.json(); });
    };
    BeerService.prototype.getBeerRatings = function () {
        return this.http.get('Apilike/GetBeerRatings')
            .map(function (res) { return res.json(); });
    };
    BeerService.prototype.removeBeerItem = function (itemGuid) {
        var bodyString = JSON.stringify({
            beerItemGuid: itemGuid
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('Apilike/RemoveBeerItem', bodyString, options)
            .map(function (res) { return res.json(); });
    };
    return BeerService;
}());
BeerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], BeerService);
exports.BeerService = BeerService;
//# sourceMappingURL=beer.service.js.map