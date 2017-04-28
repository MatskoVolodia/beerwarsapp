import { Component, OnInit } from '@angular/core';

import { ProfileService } from './profile.service';

import { User } from '../entities/user';

@Component({
    selector: 'profile',
    moduleId: module.id,
    templateUrl: './profile.component.html',
    providers: [
        ProfileService
    ]
})
export class ProfileComponent implements OnInit {
    user: User = new User();

    constructor(
        private profileService: ProfileService,
    ) {
    }

    ngOnInit() {
        this.profileService.getUser('admin')
            .subscribe(user => {
                this.user = user
                console.log(this.user);
            });
    }
}
