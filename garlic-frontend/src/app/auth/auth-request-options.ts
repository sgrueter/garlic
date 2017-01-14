import { BaseRequestOptions } from '@angular/http';

const LS_KEY = 'id_token';

export class AuthRequestOptions extends BaseRequestOptions {

    constructor() {
        super();
        let token = localStorage.getItem(LS_KEY);
        if (token != null) {
            this.headers.append('Authorization', `Bearer ${token}`);
        }
    }
}
