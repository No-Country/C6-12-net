import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AreaModel } from 'src/app/Model/Area';
import { AreaService } from '../../service/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  area : AreaModel = new AreaModel();

  constructor(private areaService: AreaService) { }

  ngOnInit(): void {
    this.areaService.GetAreas().subscribe(
      (data) => {
        console.log('areas',data);
      }
    )
  }

  saveData( form: NgForm)
  {
    if (form.invalid){
      console.log('Formulario Invalido');
      return;
    }
    this.areaService.PostArea(this.area)
      .subscribe(
        resp => console.log(resp)
      );
  }

}
