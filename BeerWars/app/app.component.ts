import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

import { User } from './entities/user';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: './app.component.html',
    providers: [
        AuthService
    ]
})

export class AppComponent implements OnInit {
    currentUser: User = new User();

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.currentUser.UserPictureUrl = 'app/icons/default.png';
        this.authService.getCurrentUser()
            .subscribe(user => {
                this.currentUser = user;
                this.currentUser.UserPictureUrl = 'app/icons/' + user.UserPictureUrl + '.png';
                console.log(this.currentUser);
            });
    }
}
