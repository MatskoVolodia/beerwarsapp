import { Component, OnInit } from '@angular/core';

import { WarService } from './war.service';

import { Contribution } from '../entities/contribution';

@Component({
    selector: 'war',
    moduleId: module.id,
    templateUrl: './war.component.html',
    providers: [
        WarService
    ]
})
export class WarComponent implements OnInit {
    totalContribution: Contribution = new Contribution;

    constructor(private warService: WarService) { }

    ngOnInit() {
        this.warService.getTotalContribution()
            .subscribe(contr => {
                this.totalContribution = contr;
            });
    }
}