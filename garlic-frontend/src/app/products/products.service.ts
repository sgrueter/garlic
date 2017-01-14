import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const ENDPOINT = '/garlic/rest/products/all';

export class Product {
    name: string;
    price: number;
    quantity: number;
}

@Injectable()
export class ProductsService {

    constructor( private http: Http ) { }

    getAllProducts(): Observable<Product[]> {
        return this.http.get( ENDPOINT )
            .map( res => res.json() );
    }

}
