/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ProductsService } from './products.service';

const ENDPOINT = '/garlic/rest/products/all';

describe( 'ProductsService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule( {
            providers: [
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory: ( backend, options ) => new Http( backend, options )
                },
                ProductsService
            ]
        });
    });

    it( 'should ...', inject( [ProductsService], ( service: ProductsService ) => {
        expect( service ).toBeTruthy();
    }) );

});
