import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ThemeComponent } from './components/theme/theme.component';
import { LanguageComponent } from './components/language/language.component';
import { Title } from '@angular/platform-browser';
import { DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

describe('AppComponent', () => {
  let titleServiceSpy: jasmine.SpyObj<Title>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Title', ['setTitle']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ThemeComponent,
        LanguageComponent,
      ],
      providers: [OAuthService, OAuthLogger, UrlHelperService, DateTimeProvider, TranslateService, { provide: Title, useValue: spy }],
    });

    titleServiceSpy = TestBed.inject(Title) as jasmine.SpyObj<Title>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should update title on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(titleServiceSpy.setTitle).toHaveBeenCalled();
  });
});
