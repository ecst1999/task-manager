import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasDetailComponent } from './tareas-detail.component';

describe('TareasDetailComponent', () => {
  let component: TareasDetailComponent;
  let fixture: ComponentFixture<TareasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
