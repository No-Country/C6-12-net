import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskShiftComponent } from './task-shift.component';

describe('TaskShiftComponent', () => {
  let component: TaskShiftComponent;
  let fixture: ComponentFixture<TaskShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
