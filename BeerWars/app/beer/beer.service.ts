import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BeerItem } from '../entities/beeritem';
import { BeerBrand } from '../entities/beerbrand';
import { BeerRating } from '../entities/beerrating';

@Injectable()
export class BeerService {
    constructor(
        private http: Http
    ) { }

    getAllBeers(): Observable<BeerItem[]> {
        return this.http.get('Apilike/GetAllBeers')
            .map(res => <BeerItem[]>res.json());
    }

    addNewBeer(beerItem: BeerItem): Observable<BeerItem> {
        let bodyString = JSON.stringify(beerItem); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 

        return this.http.post('Apilike/AddNewBeer', bodyString, options)
            .map((res: Response) => <BeerItem>res.json());
    }

    getBeerRatings(): Observable<BeerRating[]> {
        return this.http.get('Apilike/GetBeerRatings')
            .map(res => <BeerRating[]>res.json());
    }

    removeBeerItem(itemGuid: string): Observable<string> {
        let bodyString = JSON.stringify({
            beerItemGuid: itemGuid
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('Apilike/RemoveBeerItem', bodyString, options)
            .map((res: Response) => res.json());
    }
}