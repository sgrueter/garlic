/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { AuthRequestOptions } from './auth-request-options';

const LS_KEY = 'id_token';
const TOKEN = 'fake token';
const HEADER_KEY = 'Authorization';

describe( 'AuthRequestOptions', () => {

    let cut: AuthRequestOptions;
    beforeEach(() => {
        cut = new AuthRequestOptions();
        localStorage.removeItem( LS_KEY );
    });

    it( 'should add authorization header if token stored', () => {
        localStorage.setItem( LS_KEY, TOKEN );
        let options = cut.merge();
        let expectedHeaderValue = `Bearer ${TOKEN}`;
        expect( options.headers.get( HEADER_KEY ) ).toBe( expectedHeaderValue );
    });

    it( 'should not add authorization header if no token stored', () => {
        let options = cut.merge();
        expect( options.headers.get( HEADER_KEY ) ).toBeNull();
    });
});
