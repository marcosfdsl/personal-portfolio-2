import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { FormsModule } from '@angular/forms';
import { OAuthService, OAuthLogger, UrlHelperService, DateTimeProvider } from 'angular-oauth2-oidc';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [TranslateModule.forRoot(), NgxPayPalModule, FormsModule],
      providers: [
        OAuthService,
        OAuthLogger,
        UrlHelperService,
        DateTimeProvider,
        HttpClient,
        HttpHandler
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    setTimeout(function () {
      fixture.detectChanges();
    }, 3000);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open photo in new window', () => {
    spyOn(window, 'open');
    component.openPhoto();
    expect(window.open).toHaveBeenCalledWith(
      'https://i.ibb.co/1LWPk4m/FOTO-CARN-3.png',
      '_blank'
    );
  });

  it('should open contact email in new window', () => {
    spyOn(window, 'open');
    component.openContact();
    expect(window.open).toHaveBeenCalledWith(
      'mailto:mark.musicteam@hotmail.com'
    );
  });

  it('should set isDarkTheme to true when localStorage is not null and savedTheme is true', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
  
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  
    expect(component.isDarkTheme).toBe(true);
  });
  
  it('should set isDarkTheme to false when localStorage is not null and savedTheme is false', () => {
    spyOn(localStorage, 'getItem').and.returnValue('false');
  
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  
    expect(component.isDarkTheme).toBe(false);
  });
  
  it('should set isDarkTheme to false when localStorage is null and prefers-color-scheme is not dark', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
    } as MediaQueryList);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    expect(component.isDarkTheme).toBe(false);
  });
});
