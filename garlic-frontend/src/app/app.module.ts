import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService] }
];

// Workaround for https://github.com/auth0/angular2-jwt/issues/258
export function authHttpServiceFactory( http: Http, options: RequestOptions ) {
    return new AuthHttp( new AuthConfig( {}), http, options );
}

@NgModule( {
    declarations: [
        AppComponent,
        LoginComponent,
        ProductsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot( ROUTES, { useHash: true })
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        AuthService,
        AuthGuardService,
        ProductsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
