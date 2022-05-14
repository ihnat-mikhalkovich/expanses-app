import { TestBed } from '@angular/core/testing';

import { ScrollBarListenerService } from './scroll-bar-state.service';

describe('ScrollBarStateService', () => {
  let service: ScrollBarListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollBarListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
