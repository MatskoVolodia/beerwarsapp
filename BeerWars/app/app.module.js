"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/http");
var auto_complete_1 = require("@ngui/auto-complete");
var ngx_rating_1 = require("ngx-rating");
var app_component_1 = require("./app.component");
var profile_component_1 = require("./profile/profile.component");
var beer_component_1 = require("./beer/beer.component");
var feed_component_1 = require("./feed/feed.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule,
            auto_complete_1.NguiAutoCompleteModule,
            ngx_rating_1.RatingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            profile_component_1.ProfileComponent,
            beer_component_1.BeerComponent,
            feed_component_1.FeedComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map