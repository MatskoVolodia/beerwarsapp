import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { BeerService } from './beer.service';
import { AuthService } from '../auth.service';

import { BeerItem } from '../entities/beeritem';
import { BeerBrand } from '../entities/beerbrand';
import { FilterItem } from '../entities/filteritem';
import { User } from '../entities/user';

@Component({
    selector: 'beer',
    moduleId: module.id,
    templateUrl: './beer.component.html',
    providers: [
        BeerService,
        AuthService
    ]
})
export class BeerComponent implements OnInit {
    model: BeerItem;
    beerItems: BeerItem[];
    filterItems: FilterItem[];
    beerBrands: BeerBrand[];
    beerSorts: string[] = ['Light', 'Dark'];
    brandCreation: boolean = false;
    currentUser: User = new User;
    currentItems: BeerItem[];
    topLightDarkFilters: [boolean, boolean, boolean] = [false, false, false];

    constructor(
        private beerService: BeerService,
        private _sanitizer: DomSanitizer,
        private authService: AuthService
    ) {
        this.model = new BeerItem();
        this.model.BeerBrand = new BeerBrand();
        this.model.BeerBrand.Name = "";
        this.beerItems = new Array();
    }

    ngOnInit() {
        this.authService.getCurrentUser()
            .subscribe(user => {
                this.currentUser = user;
                this.beerService.getAllBeers()
                    .subscribe(items => {
                        this.beerItems = items;
                        console.log(items);
                        this.beerItems.forEach(item => item.Rating = 0);
                        this.filterItems = this.generateFilterItems();
                        this.beerBrands = this.getUniqueBeerBrands();
                        this.currentItems = this.beerItems;
                        this.beerService.getBeerRatings()
                            .subscribe(ratings => {
                                ratings.forEach(rate => {
                                    this.beerItems.find(beer => beer.Guid === rate.BeerItemGuid)
                                        .Rating = rate.Rating/2;
                                });
                            })
                    });
            })
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
        this.topLightDarkFilters[0] = false;
        filter.checked = !filter.checked;

        this.refilter();
    }

    refilter() {
        this.currentItems = new Array();
        if (this.filterItems.every(item => !item.checked)) {
            this.currentItems = this.beerItems.filter(beer => this.matchesSortFilter(beer));
        } else {
            this.currentItems = this.beerItems
                .filter(beer => this.matchesSortFilter(beer) && this.matchesBrandFilter(beer));
        }
    }

    matchesSortFilter(item: BeerItem): boolean {
        if (this.topLightDarkFilters[1] && this.topLightDarkFilters[2]) {
            return true;
        }
        if (this.topLightDarkFilters[1] || this.topLightDarkFilters[2]) {
            return item.Sort === (this.topLightDarkFilters[1] ? 'Light' : 'Dark');
        } 
        return true;
    }

    matchesBrandFilter(item: BeerItem): boolean {
        return this.filterItems.find(fitem => fitem.filter === item.BeerBrand.Name).checked;
    }

    changeSpecificFilter(index: number) {
        if (index === 1 || index === 2) {
            this.topLightDarkFilters[0] = false;
            this.topLightDarkFilters[index] = !this.topLightDarkFilters[index];
            this.refilter();
        } else {
            if (this.topLightDarkFilters[0]) {
                this.topLightDarkFilters[0] = false;
                this.refilter();
            } else {
                this.topLightDarkFilters[0] = true;
                this.topLightDarkFilters[1] = false;
                this.topLightDarkFilters[2] = false;
                this.filterItems.forEach(item => item.checked = false);
                this.currentItems = this.beerItems
                    .sort((x, y) => x.Rating <= y.Rating ? 1 : -1)
                    .slice(0, 5);
            }
        }
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

    removeBeerItem(item: BeerItem) {
        this.beerService.removeBeerItem(item.Guid)
            .subscribe(guid => {
                var beerBrandName = this.beerItems.find(item => item.Guid == guid).BeerBrand.Name;
                this.beerItems.splice(this.beerItems.findIndex(item => item.Guid == guid), 1);
                this.currentItems.splice(this.currentItems.findIndex(item => item.Guid == guid), 1);
                
                var wasLast = !this.beerItems.some(item => item.BeerBrand.Name === beerBrandName);
                if (wasLast) {
                    this.beerBrands.splice(this.beerBrands.findIndex(item => item.Name === beerBrandName), 1);
                    this.filterItems.splice(this.filterItems.findIndex(item => item.filter === beerBrandName), 1);
                }
            })
    }
}
