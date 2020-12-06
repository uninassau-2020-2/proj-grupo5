/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmpregadoServiceService } from './empregadoService.service';

describe('Service: EmpregadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpregadoServiceService]
    });
  });

  it('should ...', inject([EmpregadoServiceService], (service: EmpregadoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
