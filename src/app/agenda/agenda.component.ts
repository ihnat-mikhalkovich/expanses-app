import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addDays, startOfWeek, addWeeks, isSameDay, getDay, getDate, getWeekOfMonth, endOfWeek, endOfMonth } from 'date-fns';
import { Day } from '../Day';
import { DayService } from '../day.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  days!: Day[];
  
  year!: number;
  month!: number;
  week!: number;
  day!: number;

  dayUrl: string = this.location.path();

  constructor(
    private dayService: DayService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    let paramMap = this.activatedRoute.snapshot.paramMap;
    this.year = Number(this.activatedRoute.snapshot.paramMap.get('year'));
    this.month = Number(this.activatedRoute.snapshot.paramMap.get('month'));
    if (paramMap.has('week')) {
      this.week = Number(this.activatedRoute.snapshot.paramMap.get('week'));
    }
    if (paramMap.has('day')) {
      this.day = Number(this.activatedRoute.snapshot.paramMap.get('day'));
    }
    this.getDaysOfThis();
  }

  getMonthUrl(): string { 
    return `/calendar/year/${this.year}/month/${this.month}`;
  }

  getWeekUrl(): string { 
    if (this.week !== undefined) {
      return `/calendar/year/${this.year}/month/${this.month}/week/${this.week}`;
    } else {
      const date = new Date(this.year, this.month - 1, this.day);
      console.log(`date: ${date}`);
      const weekNumber = getWeekOfMonth(date);
      return `/calendar/year/${date.getFullYear()}/month/${date.getMonth() + 1}/week/${weekNumber}`;
    }
  }

  onTodayEvent() {
    let now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    if (this.week !== undefined) {
      this.week = getWeekOfMonth(now);
      this.day = getDay(now) + 1;
    } else {
      this.day = getDate(now);
    }
    this.getDaysOfThis();
    this.updateUrl();
  }

  onBackEvent() {
    // this.calculateDay(-1);

    this.getDaysOfThis();
    this.updateUrl();
  }

  onNextEvent() {
    // this.calculateDay(1)

    this.getDaysOfThis();
    this.updateUrl();
  }

  // private calculateDay(nextDayOffset: number):void {
  //   const date = this.getDates(this.year, this.month - 1, this.week - 1, this.day);
  //   const nextDate = addDays(date, nextDayOffset);

  //   this.year = nextDate.getFullYear();
  //   this.month = nextDate.getMonth() + 1;
    
  //   if (this.week !== undefined) {
  //     this.week = getWeekOfMonth(nextDate);
  //     this.day = getDay(nextDate) + 1;
  //   } else {
  //     this.day = getDate(nextDate);
  //   }
  // }

  updateUrl() {
    if (this.week !== undefined) {
      this.location.replaceState(`/calendar/year/${this.year}/month/${this.month}/week/${this.week}/day/${this.day}`);
    } else {
      this.location.replaceState(`/calendar/year/${this.year}/month/${this.month}/day/${this.day}`);
    }
  }

  isCurrentDate(date: Date): boolean {
    const now = new Date();
    return isSameDay(now, date);
  }
  
  getDaysOfThis(): void {
    this.getDays(this.year, this.month - 1, this.week - 1, this.day);
  }

  getDays(year: number, month: number, week: number, day: number): void {
    const dates = this.getDates(year, month, week, this.day);

    this.dayService.getDays(dates[0], dates[1])
      .subscribe(days => this.days = days);
  }

  getDates(year: number, month: number, week: number, day: number) {
    let dates: Date[] = [];
    if (this.day !== undefined) {
      if (this.week !== undefined) {
        let startOfWeek = this.getStartWeek(year, month, week);
        let date = addDays(startOfWeek, day - 1);
        dates.push(date);
        dates.push(date);
      } else {
        let date = new Date(year, month, day);
        dates.push(date);
        dates.push(date);
      }
    } else if (this.week !== undefined) {
      dates = this.getStartAndEndOfWeek(year, month, week);
    } else {
      dates = this.getStartAndEndOfMonth(year, month);
    }
    return dates;
  }

  private getStartWeek(year: number, month: number, week: number) {
    let date = new Date(year, month, 1);
    date = startOfWeek(date);
    let start = addWeeks(date, week);
    return start;
  }

  private getStartAndEndOfWeek(year: number, month: number, week: number) {
    let date = new Date(year, month, 1);
    date = startOfWeek(date);
    let start = addWeeks(date, week);
    let end = endOfWeek(start);
    return [start, end];
  }

  private getStartAndEndOfMonth(year: number, month: number) {
    let date = new Date(year, month, 1);
    const start = startOfWeek(date);
    date = endOfMonth(date);
    const end = endOfWeek(date);
    return [start, end];
  }

}
