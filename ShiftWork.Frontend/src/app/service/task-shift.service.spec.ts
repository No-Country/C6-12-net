import { TestBed } from '@angular/core/testing';

import { TaskShiftService } from './task-shift.service';

describe('TaskShiftService', () => {
  let service: TaskShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
