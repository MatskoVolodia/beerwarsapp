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

    public visible = false;
    private visibleAnimate = false;
    picturesUrls: string[] = new Array();

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.currentUser.UserPictureUrl = 'default';
        this.authService.getCurrentUser()
            .subscribe(user => {
                this.currentUser = user;
                if (!user.UserPictureUrl) {
                    user.WarSide = true;
                    user.UserPictureUrl = 'icon1';

                    this.visible = true;
                    setTimeout(() => this.visibleAnimate = true);
                }
                console.log(this.currentUser);
            });
    }

    changeSide(tf: boolean) {
        this.currentUser.WarSide = tf;
        var startIndex = tf ? 1 : 6;
        this.picturesUrls = new Array();
        this.currentUser.UserPictureUrl = `icon${startIndex}`;
        for (let i = startIndex; i < startIndex + 5; i++) {
            this.picturesUrls.push(`icon${i}`);
        }
    }

    saveChanges() {
        this.authService.saveUserChanges(this.currentUser);
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }
}
