import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-8dil5q85pw3138cv.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: '1LiMQ7a1OSsdEzgq3mG3dfhEAQBH5Fc9',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
