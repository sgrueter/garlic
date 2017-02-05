/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { AuthService, Credentials } from './auth.service';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

const LS_KEY = 'id_token';
const TOKEN = 'fake_token';
const ENDPOINT = '/garlic/rest/auth/login';
const CREDENTIALS: Credentials = { username: 'any', password: 'any' };
const ERROR = 'test error';
let consoleErrorMessage: string;

describe( 'AuthService', () => {
    beforeEach(() => {
        console.error = ( error ) => consoleErrorMessage = error.message;
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

    it( 'login() should call backend with credentials', inject(
        [AuthService, MockBackend],
        fakeAsync(( service: AuthService, backend: MockBackend ) => {
            backend.connections.subscribe(( connection: MockConnection ) => {
                expect( connection.request.method ).toBe( RequestMethod.Post );
                expect( connection.request.url ).toBe( ENDPOINT );
                expect( connection.request.json() ).toEqual( CREDENTIALS );
                const responseOptions = new ResponseOptions( { body: '{}' });
                connection.mockRespond( new Response( responseOptions ) );
            });
            service.login( CREDENTIALS );
        }) ) );

    it( 'login() should store token', inject(
        [AuthService, MockBackend],
        fakeAsync(( service: AuthService, backend: MockBackend ) => {
            backend.connections.subscribe(( connection: MockConnection ) => {
                const mockResponseBody = `{"${LS_KEY}":"${TOKEN}"}`;
                const responseOptions = new ResponseOptions( { body: mockResponseBody });
                connection.mockRespond( new Response( responseOptions ) );
            });
            service.login( CREDENTIALS );
            const actual = localStorage.getItem( LS_KEY );
            expect( actual ).toBe( TOKEN );
        }) ) );

    it( 'login() should handle error', inject(
        [AuthService, MockBackend],
        fakeAsync(( service: AuthService, backend: MockBackend ) => {
            backend.connections.subscribe(( connection: MockConnection ) => {
                connection.mockError( new Error( ERROR ) );
            });
            service.login( CREDENTIALS );
            expect( consoleErrorMessage ).toBe( ERROR );
        }) ) );

    it( 'logout() should remove token', inject( [AuthService], ( service: AuthService ) => {
        localStorage.setItem( LS_KEY, TOKEN );
        service.logout();
        const actual = localStorage.getItem( LS_KEY );
        expect( actual ).toBeNull();
    }) );

    it( 'loggedIn() should return false without stored token', inject( [AuthService], ( service: AuthService ) => {
        const actual = service.loggedIn();
        expect( actual ).toBe( false );
    }) );
});
