import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  OAuthService,
  OAuthLogger,
  UrlHelperService,
  DateTimeProvider,
} from 'angular-oauth2-oidc';
import { AuthGoogleService } from './auth-google.service';


describe('AuthGoogleService', () => {
  let service: AuthGoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        OAuthService,
        OAuthLogger,
        UrlHelperService,
        DateTimeProvider,
      ],
    });
    service = TestBed.inject(AuthGoogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
