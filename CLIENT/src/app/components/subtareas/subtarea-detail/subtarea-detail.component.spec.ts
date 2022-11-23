import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtareaDetailComponent } from './subtarea-detail.component';

describe('SubtareaDetailComponent', () => {
  let component: SubtareaDetailComponent;
  let fixture: ComponentFixture<SubtareaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtareaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtareaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
