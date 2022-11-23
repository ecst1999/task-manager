import { TestBed } from '@angular/core/testing';

import { SubTareaService } from './sub-tarea.service';

describe('SubTareaService', () => {
  let service: SubTareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubTareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
