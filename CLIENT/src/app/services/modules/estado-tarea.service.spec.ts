import { TestBed } from '@angular/core/testing';

import { EstadoTareaService } from './estado-tarea.service';

describe('EstadoTareaService', () => {
  let service: EstadoTareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoTareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
