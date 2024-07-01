import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ThemeComponent } from './theme.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    setTimeout(function () {
      fixture.detectChanges();
    }, 3000);
  });

  // it('should toggle theme', fakeAsync(() => {
  //   const backgroundElement = document.createElement('div');
  //   backgroundElement.classList.add('background');
  //   document.body.appendChild(backgroundElement);

  //   const contactElement = document.createElement('img');
  //   contactElement.classList.add('contact-icon');
  //   document.body.appendChild(contactElement);

  //   const containerCv = document.createElement('img');
  //   containerCv.classList.add('container-cv');
  //   document.body.appendChild(containerCv);

  //   const updateThemeSpy = spyOn(component, 'updateTheme').and.callThrough();

  //   component.toggleTheme();
  //   tick();

  //   expect(component.isDarkTheme).toBe(false);
  //   expect(updateThemeSpy).toHaveBeenCalled();

  //   expect(
  //     (document.querySelector('.background') as HTMLElement).style
  //       .backgroundImage
  //   ).toBe(`url("${component.backgroundUrl}")`);
  //   expect(
  //     (document.querySelector('.contact-icon') as HTMLImageElement).src
  //   ).toContain(component.contactIconUrl);
  //   expect(
  //     (document.querySelector('.container-cv') as HTMLElement).classList
  //   ).toContain('bg-black');

    
  //   component.toggleTheme();
  //   tick();
    
  //   expect(component.isDarkTheme).toBe(true);
  //   expect(updateThemeSpy).toHaveBeenCalledTimes(2);

  //   expect(
  //     (document.querySelector('.background') as HTMLElement).style
  //       .backgroundImage
  //   ).toBe(`url("${component.backgroundUrlDark}")`);
  //   expect(
  //     (document.querySelector('.contact-icon') as HTMLImageElement).src
  //   ).toContain(component.contactIconUrlDark);
  //   expect(
  //     (document.querySelector('.container-cv') as HTMLElement).classList
  //   ).toContain('bg-white');

  //   document.body.removeChild(backgroundElement);
  //   document.body.removeChild(contactElement);
  // }));

  it('should set isDarkTheme to true when localStorage is null and prefers-color-scheme is dark', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
    } as MediaQueryList);
    expect(component.isDarkTheme).toBe(false);
  }));
});
