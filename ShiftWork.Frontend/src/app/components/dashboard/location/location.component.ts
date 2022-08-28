import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationModel } from 'src/app/Model/Location';
import { LocationService } from '../../../service/location.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit
{

  location : LocationModel = new LocationModel();

  Locations: any;

  constructor(private locationService: LocationService,
    public _router: Router,
    public _location: Location ) { }

  ngOnInit(): void
  {
    this.getLocations();
    this.location.locationId = 0;
  }
  private getLocations()
  {
    this.locationService.GetLocations().subscribe(  //Nose cual es el error que no toma el ".Suscribe"
      (data) => {
        this.Locations = data;
        console.log('locations', data);
      }
    );
  }

  saveData(form: NgForm)
  {
    console.log(this.location);
    console.log(this.location.locationId);
    if (form.invalid) {
      console.log('Formulario Invalido');
      return;
    }
    if (this.Locations.locationId > 0)
    {
      this.locationService.PutLocation(this.location) //Me pide 2 Argumentos pero nose si el otro es this.locationId y con "this." no me dejaba
        .subscribe(
          resp => console.log(resp)
        );
    }
    else
    {
      this.locationService.PostLocation(this.location)
        .subscribe(
          resp => console.log(resp)
        );
    }
    this.location = new LocationModel();
  }

  selectedLocation(location: LocationModel)
  {
    this.location = location;
  }

  deleteLocation(location: LocationModel)
  {
    console.log(location);
    this.locationService.DeleteLocation(location.locationId).subscribe();
    this.getLocations();
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
