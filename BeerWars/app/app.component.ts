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
        this.authService.getCurrentUser()
            .subscribe(user => {
                this.currentUser = user;
                console.log(this.currentUser);
            });
    }
}
