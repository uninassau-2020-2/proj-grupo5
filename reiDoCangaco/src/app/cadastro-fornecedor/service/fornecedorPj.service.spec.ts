/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FornecedorPjService } from './fornecedorPj.service';

describe('Service: FornecedorPj', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FornecedorPjService]
    });
  });

  it('should ...', inject([FornecedorPjService], (service: FornecedorPjService) => {
    expect(service).toBeTruthy();
  }));
});
