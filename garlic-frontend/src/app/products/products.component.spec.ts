/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ProductsComponent } from './products.component';
import { ProductsService, Product } from './products.service';

const PRODUCTS: Product[] = [{ name: 'foo', price: 1.23, quantity: 1234 }];

class ProductsServiceStub {
    getAllProducts(): Observable<Product[]> {
        return Observable.of( PRODUCTS );
    }
}

describe( 'ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;

    beforeEach( async(() => {
        TestBed.configureTestingModule( {
            providers: [
                { provide: ProductsService, useClass: ProductsServiceStub }
            ],
            declarations: [ProductsComponent]
        })
            .compileComponents();
    }) );

    beforeEach(() => {
        fixture = TestBed.createComponent( ProductsComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    });
});
