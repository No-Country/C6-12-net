import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AreaComponent } from './components/dashboard/area/area.component';
import { LocationComponent } from './components/dashboard/location/location.component';
import { ClockShiftComponent } from './components/dashboard/clock-shift/clock-shift.component';
import { TaskShiftComponent } from './components/dashboard/task-shift/task-shift.component';
import { PeopleComponent } from './components/dashboard/people/people.component';
import { SheduleComponent } from './components/dashboard/shedule/shedule.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {path:'inicio',component:InicioComponent},
  {path:'dashboard',component:DashboardComponent, children:[
    {path:'',component: ClockShiftComponent },
    {path:'schedule',component:SheduleComponent},
    { path: 'people', component: PeopleComponent },
    { path: 'area', component: AreaComponent },
    { path: 'location', component: LocationComponent },
    { path: 'clockshift', component: ClockShiftComponent },
    { path: 'taskshift', component: TaskShiftComponent },
  ]},
  {path:'**',redirectTo:'inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
