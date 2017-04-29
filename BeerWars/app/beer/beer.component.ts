import { Component, OnInit } from '@angular/core';

import { BeerService } from './beer.service';

import { BeerItem } from '../entities/beeritem';
import { BeerBrand } from '../entities/beerbrand';
@Component({
    selector: 'beer',
    moduleId: module.id,
    templateUrl: './beer.component.html',
    providers: [
        BeerService
    ]
})
export class BeerComponent implements OnInit {
    model: BeerItem;
    beerItems: BeerItem[];

    constructor(
        private beerService: BeerService,
    ) {
        this.model = new BeerItem();
        this.model.BeerBrand = new BeerBrand();
        this.beerItems = new Array();
    }

    ngOnInit() {
        this.beerService.getAllBeers()
            .subscribe(items => this.beerItems = items);
    }

    addNewBeer() {
        this.beerService.addNewBeer(this.model)
            .subscribe(item => {
                this.beerItems.push(item);
                console.log('Beer added');
            });
    }
}
