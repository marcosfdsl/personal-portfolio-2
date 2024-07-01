import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import {
  OAuthService,
  OAuthLogger,
  UrlHelperService,
  DateTimeProvider,
} from 'angular-oauth2-oidc';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthGoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, TranslateModule.forRoot()],
      providers: [
        OAuthService,
        OAuthLogger,
        UrlHelperService,
        DateTimeProvider,
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    setTimeout(function () {
      fixture.detectChanges();
    }, 3000);
    service = TestBed.inject(AuthGoogleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
