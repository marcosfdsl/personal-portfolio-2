import { Injectable, OnDestroy } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService implements OnDestroy {
  private tokenReceivedSubscription!: Subscription;

  constructor(private oauthService: OAuthService) {
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId:
        '472448946332-n1prektnrpaps4gkkruvei2h69dlq730.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/loading',
      scope: 'openid profile email',
    };

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  isSessionActive(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  ngOnDestroy() {
    if (this.tokenReceivedSubscription) {
      this.tokenReceivedSubscription.unsubscribe();
    }
  }
}