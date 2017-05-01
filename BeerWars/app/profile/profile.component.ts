import { Component, OnInit } from '@angular/core';

import { ProfileService } from './profile.service';

import { User } from '../entities/user';
import { RankItem } from '../entities/rankitem';
import { RankItemDefinitions } from '../entities/rankitem';
import { Contribution } from '../entities/contribution';


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
    ranks: RankItem[] = new Array();
    usersContribution: Contribution = new Contribution();
    userrank: number;

    constructor(
        private profileService: ProfileService,
    ) {
    }

    ngOnInit() {
        this.profileService.getUser('admin')
            .subscribe(user => {
                this.user = user;
                this.profileService.getUsersContribution(this.user.Username)
                    .subscribe(res => {
                        this.usersContribution = res;
                        this.userrank = this.user.WarSide ?
                            this.usersContribution.LightSide :
                            this.usersContribution.DarkSide;
                    })

                this.ranks = this.user.WarSide ?
                    RankItemDefinitions.LightSide :
                    RankItemDefinitions.DarkSide;
            });
    }
}
