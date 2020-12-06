/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FornecedorPfService } from './fornecedorPf.service';

describe('Service: FornecedorPf', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FornecedorPfService]
    });
  });

  it('should ...', inject([FornecedorPfService], (service: FornecedorPfService) => {
    expect(service).toBeTruthy();
  }));
});
