/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe( 'AuthService', () => {
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
                AuthService
            ]
        });
    });

    it( 'should ...', inject( [AuthService], ( service: AuthService ) => {
        expect( service ).toBeTruthy();
    }) );
});
