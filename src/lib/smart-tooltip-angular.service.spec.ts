import { TestBed } from '@angular/core/testing';

import { SmartTooltipAngularService } from './smart-tooltip-angular.service';

describe('SmartTooltipAngularService', () => {
  let service: SmartTooltipAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartTooltipAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
