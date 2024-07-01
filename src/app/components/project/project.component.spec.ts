import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    setTimeout(function () {
      fixture.detectChanges();
    }, 3000);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
