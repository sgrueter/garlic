/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthService, Credentials } from './auth.service';

class AuthServiceStub {
    loggedIn() {
        return true;
    }
}

class RouterStub {
    navigateByUrl( url: string ) { return url; }
}

describe( 'AuthGuardService', () => {
    let authServiceStub = new AuthServiceStub();
    let routerStub = new RouterStub();
    beforeEach(() => {
        TestBed.configureTestingModule( {
            providers: [
                { provide: AuthService, useValue: authServiceStub },
                { provide: Router, useValue: routerStub },
                AuthGuardService
            ]
        });
    });

    it( 'should ...', inject( [AuthGuardService], ( service: AuthGuardService ) => {
        expect( service ).toBeTruthy();
    }) );

    it( 'should activate if logged in', inject( [AuthGuardService], ( service: AuthGuardService ) => {
        expect( service.canActivate() ).toBe( true );
    }) );

    it( 'should navigate if not logged in', inject( [AuthGuardService], ( service: AuthGuardService ) => {
        spyOn( authServiceStub, 'loggedIn' ).and.returnValue( false );
        const routerSpy = spyOn( routerStub, 'navigateByUrl' );
        expect( service.canActivate() ).toBe( false );
        expect( routerSpy.calls.count() ).toBe( 1 );
        expect( routerSpy.calls.first().args[0] ).toBe( '/login' );
    }) );

});
