import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollBarComponent } from './scroll-bar/scroll-bar.component';
import { ScaleBarComponent } from './scale-bar/scale-bar.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './day/day.component';
import { AgendaComponent } from './agenda/agenda.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollBarComponent,
    ScaleBarComponent,
    MonthComponent,
    WeekComponent,
    DayComponent,
    AgendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
