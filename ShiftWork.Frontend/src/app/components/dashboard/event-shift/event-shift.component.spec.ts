import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShiftComponent } from './event-shift.component';

describe('EventShiftComponent', () => {
  let component: EventShiftComponent;
  let fixture: ComponentFixture<EventShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
