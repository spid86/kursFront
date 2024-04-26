import { TestBed } from '@angular/core/testing';

import { CosmicBodyService } from './cosmic-body.service';

describe('CosmicBodyService', () => {
  let service: CosmicBodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosmicBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
