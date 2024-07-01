import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioComponent } from './portfolio.component';
import { ProjectComponent } from '../../components/project/project.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPayPalModule } from 'ngx-paypal';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioComponent, ProjectComponent],
      imports: [TranslateModule.forRoot(), NgxPayPalModule],
    });
    fixture = TestBed.createComponent(PortfolioComponent);
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
  
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
  
    expect(component.isDarkTheme).toBe(true);
  });
  
  it('should set isDarkTheme to false when localStorage is not null and savedTheme is false', () => {
    spyOn(localStorage, 'getItem').and.returnValue('false');
  
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
  
    expect(component.isDarkTheme).toBe(false);
  });
  
  it('should set isDarkTheme to false when localStorage is null and prefers-color-scheme is not dark', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
    } as MediaQueryList);

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;

    expect(component.isDarkTheme).toBe(false);
  });
});
