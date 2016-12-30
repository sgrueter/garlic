/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, Credentials } from '../auth/auth.service';
import { LoginComponent } from './login.component';

class AuthServiceStub {
    login( credentials: Credentials ) {
        return true;
    }
    loggedIn() {
        return true;
    }
    logout() { }
}

describe( 'LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authServiceStub = new AuthServiceStub();
    beforeEach( async(() => {
        TestBed.configureTestingModule( {
            imports: [FormsModule],
            declarations: [LoginComponent],
            providers: [{ provide: AuthService, useValue: authServiceStub }]
        }).compileComponents();
    }) );

    beforeEach(() => {
        fixture = TestBed.createComponent( LoginComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    });

    it( 'should pass credentials to auth service', () => {
        const credentials = { username: 'foo', password: 'bar' };
        const spy = spyOn( authServiceStub, 'login' );
        component.onLogin( credentials );
        expect( spy.calls.count() ).toBe( 1 );
        expect( spy.calls.first().args[0] ).toBe( credentials );
    });
});
