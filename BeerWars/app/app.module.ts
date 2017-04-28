import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { BeerComponent } from './beer/beer.component';
import { FeedComponent } from './feed/feed.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
    ],
  declarations: [
      AppComponent,
      ProfileComponent,
      BeerComponent,
      FeedComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
