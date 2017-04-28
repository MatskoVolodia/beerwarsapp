import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { BeerComponent } from './beer/beer.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent },
    { path: 'beer', component: BeerComponent },
    { path: 'feed', component: FeedComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }