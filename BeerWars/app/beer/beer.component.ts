import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { BeerService } from './beer.service';

import { BeerItem } from '../entities/beeritem';
import { BeerBrand } from '../entities/beerbrand';
import { FilterItem } from '../entities/filteritem';

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
    filterItems: FilterItem[];
    beerBrands: BeerBrand[];
    beerSorts: string[] = ['Light', 'Dark'];
    brandCreation: boolean = false;
    topLightDarkFilters: [boolean, boolean, boolean] = [false, false, false];

    constructor(
        private beerService: BeerService,
        private _sanitizer: DomSanitizer
    ) {
        this.model = new BeerItem();
        this.model.BeerBrand = new BeerBrand();
        this.model.BeerBrand.Name = "";
        this.beerItems = new Array();
    }

    ngOnInit() {
        this.beerService.getAllBeers()
            .subscribe(items => {
                this.beerItems = items;
                this.filterItems = this.generateFilterItems();
                this.beerBrands = this.getUniqueBeerBrands();
            });
    }

    addNewBeer() {
        this.beerService.addNewBeer(this.model)
            .subscribe(item => {
                this.beerItems.push(item);
                console.log('Beer added');
            });
    }

    generateFilterItems(): FilterItem[] {
        return this.beerItems.map(item => item.BeerBrand.Name)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(item => {
                var temp = new FilterItem();
                temp.filter = item;
                temp.checked = false;
                return temp;
            }); 
    }

    changeFilterState(filter: FilterItem) {
        filter.checked = !filter.checked;
    }

    changeSpecificFilter(index: number) {
        this.topLightDarkFilters[index] = !this.topLightDarkFilters[index];
    }

    getUniqueBeerBrands(): BeerBrand[] {
        return this.beerItems.map(item => item.BeerBrand)
            .filter((value, index, self) =>
                self.findIndex(item => item.Name === value.Name) === index);
    }

    autocompleListFormatter = (data: BeerBrand) => {
        let html = `<span style="cursor: pointer" class='option-span'>
            <img style="width: 30px" src=${data.LogoUrl} />
            ${data.Name} 
        </span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    autocompleteSortFormatter = (data: string) => {
        let html = `<span style="cursor: pointer" class='option-span'>${data}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }
}
