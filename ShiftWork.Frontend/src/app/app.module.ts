import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InicioComponent } from './components/inicio/inicio.component';
// Import the module from the SDK
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { environment as env } from '../environments/environment';
import { AreaComponent } from './components/dashboard/area/area.component';
import { LocationComponent } from './components/dashboard/location/location.component';
import { RoleComponent } from './components/dashboard/role/role.component';
import { PeopleComponent } from './components/dashboard/people/people.component';
import { TaskShiftComponent } from './components/dashboard/task-shift/task-shift.component';
import { ClockShiftComponent } from './components/dashboard/clock-shift/clock-shift.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NavBarComponent } from './components/dashboard/nav-bar/nav-bar.component';
import { SheduleComponent } from './components/dashboard/shedule/shedule.component';
import { EventShiftComponent } from './components/dashboard/event-shift/event-shift.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    DashboardComponent,
    AreaComponent,
    LocationComponent,
    RoleComponent,
    PeopleComponent,
    TaskShiftComponent,
    ClockShiftComponent,
    NavBarComponent,
    SheduleComponent,
    EventShiftComponent
  ],
  imports: [
    BrowserModule,
   // RecurrenceEditorAllModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
