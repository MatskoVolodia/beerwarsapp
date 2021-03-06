import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { RatingModule } from "ngx-rating";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { BeerComponent } from './beer/beer.component';
import { FeedComponent } from './feed/feed.component'; 
import { ModalComponent } from './modal/modal.component';
import { WarComponent } from './war/war.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        NguiAutoCompleteModule,
        RatingModule
    ],
  declarations: [
      AppComponent,
      ProfileComponent,
      BeerComponent,
      FeedComponent,
      ModalComponent,
      WarComponent
    ],
  providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
