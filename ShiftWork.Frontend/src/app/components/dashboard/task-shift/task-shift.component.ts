import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskShiftModel } from 'src/app/Model/TaskShift';
import { TaskShiftService } from '../../../service/task-shift.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-shift',
  templateUrl: './task-shift.component.html',
  styleUrls: ['./task-shift.component.css']
})
export class TaskShiftComponent implements OnInit {

  taskShift : TaskShiftModel = new TaskShiftModel();

  TaskShift : any;

  constructor(private TaskShiftService: TaskShiftService,
    public _router : Router,
    public _location: Location ) { }

    ngOnInit(): void
  {
    this.getTaskShift();
    this.taskShift.taskShiftId = 0;
  }

  private getTaskShift()
  {
    this.TaskShiftService.GetTaskShift().subscribe(
      (data) => {
        this.TaskShift = data;
        console.log('TaskShift', data);
      }
    );
  }

  saveData( form: NgForm)
  {
    console.log(this.taskShift);
    console.log(this.TaskShift.taskShiftId);
    if (form.invalid){
      console.log('Formulario Invalido');
      return;
    }
    if (this.taskShift.taskShiftId > 0)
    {
      this.TaskShiftService.PutTaskShift(this.taskShift)
      .subscribe(
        resp => console.log(resp)
      );
    }
    else
    {
      this.TaskShiftService.PostTaskShift(this.taskShift)
        .subscribe(
          resp => console.log(resp)
        );
    }
    this.taskShift = new TaskShiftModel();
  }

  selectedTaskShift(taskShift: TaskShiftModel)
  {
    this.taskShift = taskShift;
  }

  deleteTaskShift(taskShift: TaskShiftModel)
  {
    console.log(taskShift);
    this.TaskShiftService.DeleteTaskShift(taskShift.taskShiftId).subscribe();
    this.getTaskShift();
  }

  refresh(): void
  {
    this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() =>
    {
	  console.log(decodeURI(this._location.path()));
	  this._router.navigate([decodeURI(this._location.path())]);
	});
  }
}
