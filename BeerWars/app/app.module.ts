import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { RatingModule } from "ngx-rating";

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { BeerComponent } from './beer/beer.component';
import { FeedComponent } from './feed/feed.component'; 
import { ModalComponent } from './modal/modal.component';

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
      ModalComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
