import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvComponent } from './cv.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPayPalModule } from 'ngx-paypal';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvComponent],
      imports: [TranslateModule.forRoot(), NgxPayPalModule],
    });
    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    setTimeout(function () {
      fixture.detectChanges();
    }, 3000);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isDarkTheme to true when localStorage is not null and savedTheme is true', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
  
    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
  
    expect(component.isDarkTheme).toBe(true);
  });
  
  it('should set isDarkTheme to false when localStorage is not null and savedTheme is false', () => {
    spyOn(localStorage, 'getItem').and.returnValue('false');
  
    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
  
    expect(component.isDarkTheme).toBe(false);
  });
  
  it('should set isDarkTheme to false when localStorage is null and prefers-color-scheme is not dark', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
    } as MediaQueryList);

    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;

    expect(component.isDarkTheme).toBe(false);
  });
});
