import { TestBed } from '@angular/core/testing';

import { ScheduleClockService } from './schedule-clock.service';

describe('ScheduleClockService', () => {
  let service: ScheduleClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
