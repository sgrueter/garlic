import { Component, OnInit } from '@angular/core';
import { AuthService, Credentials } from '../auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    credentials: Credentials;

    constructor(private auth: AuthService) {
        this.credentials = new Credentials();
    }

    onLogin(credentials) {
        this.auth.login(credentials);
    }
    
    ngOnInit() {
        this.auth.logout();
    }

}
