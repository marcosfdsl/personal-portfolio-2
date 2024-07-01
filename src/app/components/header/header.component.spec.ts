import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import {
  DateTimeProvider,
  OAuthLogger,
  OAuthService,
  UrlHelperService,
} from 'angular-oauth2-oidc';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterModule,
        HttpClientTestingModule,
        HttpClientModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        OAuthService,
        OAuthLogger,
        UrlHelperService,
        DateTimeProvider,
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map(),
              queryParamMap: new Map(),
            },
            params: of({}),
            queryParams: of({}),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    setTimeout(function () {
      fixture.detectChanges();
    }, 3000);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch weather data by IP with default language "es" when lang is undefined or null', () => {
    const mockWeatherResponse = {
      location: { name: 'Test City', region: 'Test Region' },
      current: { temp_c: 20, condition: { text: 'Sunny', icon: 'sunny.png' } },
    };
    const mockIpAddress = '127.0.0.1';

    const ipifyReq = httpMock.expectOne('https://api.ipify.org?format=json');
    expect(ipifyReq.request.method).toBe('GET');
    ipifyReq.flush({ ip: mockIpAddress });

    const weatherReq = httpMock.expectOne(
      `http://api.weatherapi.com/v1/current.json?key=14f23aeec6a14fd48ea181740241504&lang=es&q=${mockIpAddress}`
    );
    expect(weatherReq.request.method).toBe('GET');
    weatherReq.flush(mockWeatherResponse);

    const authReq = httpMock.expectOne(
      'https://accounts.google.com/.well-known/openid-configuration'
    );
    expect(authReq.request.method).toBe('GET');
    authReq.flush({});

    expect(component.weatherData).toEqual(mockWeatherResponse);
  });
});
