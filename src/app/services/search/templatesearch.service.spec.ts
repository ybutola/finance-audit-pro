import { TestBed } from '@angular/core/testing';

import { TemplatesearchService } from './templatesearch.service';

describe('TemplatesearchService', () => {
  let service: TemplatesearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatesearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
