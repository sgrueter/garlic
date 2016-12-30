import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

const ENDPOINT = '/garlic/rest/products/all';

export class Product {
    name: string;
    price: number;
    quantity: number;
}

@Injectable()
export class ProductsService {

    constructor( private authHttp: AuthHttp ) { }

    getAllProducts(): Observable<Product[]> {
        return this.authHttp.get( ENDPOINT )
            .map( res => res.json() );
    }

}
