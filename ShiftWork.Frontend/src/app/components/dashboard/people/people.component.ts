import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleModel } from 'src/app/Model/People';
import { PeopleService } from '../../../service/people.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people: PeopleModel = new PeopleModel();

  People: any;

  constructor(private peopleService: PeopleService,
    public _router: Router,
    public _location: Location ) { }

  ngOnInit(): void {
    this.getPeople();
    this.people.PersonId = 0;
  }

  private getPeople() {
    this.peopleService.GetPeople().subscribe(
      (data) => {
        this.People = data;
        console.log('people', data);
      }
    );
  }

  saveData(form: NgForm) {
    console.log(this.people);
    console.log(this.people.PersonId);
    if (form.invalid) {
      console.log('Formulario Invalido');
      return;
    }
    if (this.people.PersonId > 0) {
      this.peopleService.PutPerson(this.people)
        .subscribe(
          resp => console.log(resp)
        );
    }
    else
    {
      this.peopleService.PostPerson(this.people)
        .subscribe(
          resp => console.log(resp)
        );
    }
    this.people = new PeopleModel();
  }

  selectedPeople(people: PeopleModel) {
    this.people = people;
  }

  deletePeople(people: PeopleModel) {
    console.log(people);
    this.peopleService.DeletePerson(this.people.PersonId).subscribe();
    this.getPeople();
  }

  refresh(): void {
    this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }
    

}
