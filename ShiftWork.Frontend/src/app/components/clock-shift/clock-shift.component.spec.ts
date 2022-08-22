import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockShiftComponent } from './clock-shift.component';

describe('ClockShiftComponent', () => {
  let component: ClockShiftComponent;
  let fixture: ComponentFixture<ClockShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
