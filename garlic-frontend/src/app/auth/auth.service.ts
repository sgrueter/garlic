import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

const LS_KEY = 'id_token';
const ENDPOINT = '/garlic/rest/auth/login';

export class Credentials {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {

    constructor( private http: Http ) { }

    login( credentials: Credentials ) {
        this.http
            .post( ENDPOINT, credentials )
            .map( res => res.json() )
            .subscribe( this.handleData, this.handleError );
    }

    loggedIn() {
        return tokenNotExpired( LS_KEY );
    }

    logout() {
        localStorage.removeItem( LS_KEY );
    }

    private handleData( data ) {
        let token = data[LS_KEY];
        if ( token ) {
            localStorage.setItem( LS_KEY, token );
        }
    }

    private handleError( error ) {
        console.error( error );
    }
}
