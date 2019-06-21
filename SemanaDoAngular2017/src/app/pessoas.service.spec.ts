import { TestBed } from '@angular/core/testing';

import { PessoasService } from './pessoas.service';

describe('PessoasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PessoasService = TestBed.get(PessoasService);
    expect(service).toBeTruthy();
  });
});
