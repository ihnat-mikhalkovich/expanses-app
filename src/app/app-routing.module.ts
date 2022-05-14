import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './day/day.component';
import { AgendaComponent } from './agenda/agenda.component';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const routes: Routes = [
  {
    path: 'calendar/year/:year/month/:month', 
    component: MonthComponent
  },
  {
    path: 'calendar/year/:year/month/:month/week/:week', 
    component: WeekComponent
  },
  {
    path: 'calendar/year/:year/month/:month/week/:week/day/:day', 
    component: DayComponent
  },
  {
    path: 'calendar/year/:year/month/:month/day/:day', 
    component: DayComponent
  },
  {
    path: 'calendar/year/:year/month/:month/week/:week/day/:day/agenda', 
    component: AgendaComponent
  },
  {
    path: 'calendar/year/:year/month/:month/week/:week/agenda', 
    component: AgendaComponent
  },
  {
    path: 'calendar/year/:year/month/:month/agenda',
    component: AgendaComponent
  },
  {
    path: 'calendar/year/:year/month/:month/day/:day/agenda',
    component: AgendaComponent
  },
  { 
    path : '', 
    redirectTo : `/calendar/year/${currentYear}/month/${currentMonth}`,
    pathMatch : 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
