import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { AreaModel } from 'src/app/Model/Area';
import { AreaService } from '../../service/area.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  area : AreaModel = new AreaModel();

  Areas : any;

  constructor(private areaService: AreaService,
     public _router : Router,
     public _location: Location ) { }

  ngOnInit(): void {
    this.getAreas();
    this.area.areaId = 0;
  }

  private getAreas() {
    this.areaService.GetAreas().subscribe(
      (data) => {
        this.Areas = data;
        console.log('areas', data);
      }
    );
  }

  saveData( form: NgForm)
  {
    console.log(this.area);
    console.log(this.area.areaId);
    if (form.invalid){
      console.log('Formulario Invalido');
      return;
    }
    if (this.area.areaId > 0)
    {
      this.areaService.PutArea(this.area)
      .subscribe(
        resp => console.log(resp)
      );
    }
    else
    {
      this.areaService.PostArea(this.area)
        .subscribe(
          resp => console.log(resp)
        );
    }
    this.area = new AreaModel();
  }

  selectedArea(area: AreaModel)
  {
    this.area = area;
  }

  deleteArea(area: AreaModel)
  {
    console.log(area);
    this.areaService.DeleteArea(area.areaId).subscribe();
    this.getAreas();
  }

  refresh(): void {
		this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
		console.log(decodeURI(this._location.path()));
		this._router.navigate([decodeURI(this._location.path())]);
		});
	}


}
