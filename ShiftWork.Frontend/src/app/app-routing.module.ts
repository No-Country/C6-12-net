import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AreaComponent } from './components/area/area.component';
import { LocationComponent } from './components/location/location.component';
import { ScheduleShiftComponent } from './components/schedule/scheduleShift.component';
import { ClockShiftComponent } from './components/clock-shift/clock-shift.component';
import { TaskShiftComponent } from './components/task-shift/task-shift.component';
import { PeopleComponent } from './components/people/people.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {path:'inicio',component:InicioComponent},
  { path: 'people', component: PeopleComponent },
  { path: 'area', component: AreaComponent },
  {path:'dashboard',component:DashboardComponent},
  { path: 'location', component: LocationComponent },
  { path: 'schedule', component: ScheduleShiftComponent },
  { path: 'clockshift', component: ClockShiftComponent },
  { path: 'taskshift', component: TaskShiftComponent },
  { path: 'create', component: ProductCreateComponent },
  {path:'**',redirectTo:'inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
