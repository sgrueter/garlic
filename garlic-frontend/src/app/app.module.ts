import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthRequestOptions} from './auth/auth-request-options';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService] }
];

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
        { provide: RequestOptions, useClass: AuthRequestOptions },
        AuthService,
        AuthGuardService,
        ProductsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
