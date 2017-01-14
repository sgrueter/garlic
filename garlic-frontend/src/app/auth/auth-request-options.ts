import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';

const LS_KEY = 'id_token';

export class AuthRequestOptions extends BaseRequestOptions {

    merge( options?: RequestOptionsArgs ): RequestOptions {
        let modifiedOptions = super.merge( options );
        let token = localStorage.getItem( LS_KEY );
        if ( token != null ) {
            modifiedOptions.headers.set( 'Authorization', `Bearer ${token}` );
        }
        return modifiedOptions;
    }
}
