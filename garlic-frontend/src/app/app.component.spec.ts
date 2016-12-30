/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ROUTES } from './app.module';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { AuthService } from './auth/auth.service';

class AuthServiceStub {
    loggedIn() {
        return true;
    }
    logout() { }
}

describe( 'AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let authServiceStub = new AuthServiceStub();

    beforeEach( async(() => {
        TestBed.configureTestingModule( {
            imports: [
                FormsModule,
                RouterModule.forRoot( ROUTES, { useHash: true })
            ],
            declarations: [
                AppComponent,
                LoginComponent,
                ProductsComponent
            ],
            providers: [{ provide: AuthService, useValue: authServiceStub }]
        }).compileComponents();
    }) );

    beforeEach(() => {
        fixture = TestBed.createComponent( AppComponent );
        component = fixture.debugElement.componentInstance;
    });

    it( 'should create the app', async(() => {
        expect( component ).toBeTruthy();
    }) );

    it( 'logout() should call auth service', () => {
        const spy = spyOn( authServiceStub, 'logout' );
        component.logout();
        expect( spy.calls.count() ).toBe( 1 );
    });
});
