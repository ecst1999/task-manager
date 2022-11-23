import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtareaFormComponent } from './subtarea-form.component';

describe('SubtareaFormComponent', () => {
  let component: SubtareaFormComponent;
  let fixture: ComponentFixture<SubtareaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtareaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtareaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
