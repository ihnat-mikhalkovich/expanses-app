import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addDays, startOfWeek, addWeeks, isSameDay, getDay, getDate, getWeekOfMonth } from 'date-fns';
import { Day } from '../Day';
import { DayService } from '../day.service';
import { ScrollBarListenerService } from '../scroll-bar-state.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  dayItem!: Day;
  
  year!: number;
  month!: number;
  week!: number;
  day!: number;

  dayUrl: string = this.location.path();

  constructor(
    private dayService: DayService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private scrollBarStateService: ScrollBarListenerService
  ) {

    this.scrollBarStateService
      .subscribeOnScrollBar(
        () => this.onTodayEvent(), 
        () => this.onBackEvent(), 
        () => this.onNextEvent()
      );
  }

  ngOnInit(): void {
    let paramMap = this.activatedRoute.snapshot.paramMap;
    this.year = Number(this.activatedRoute.snapshot.paramMap.get('year'));
    this.month = Number(this.activatedRoute.snapshot.paramMap.get('month'));
    if (paramMap.has('week')) {
      this.week = Number(this.activatedRoute.snapshot.paramMap.get('week'));
    }
    this.day = Number(this.activatedRoute.snapshot.paramMap.get('day'));
    this.getDayOfThis();
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
    this.getDayOfThis();
    this.updateUrl();
  }

  onBackEvent() {
    this.calculateDay(-1);

    this.getDayOfThis();
    this.updateUrl();
  }

  onNextEvent() {
    this.calculateDay(1)

    this.getDayOfThis();
    this.updateUrl();
  }

  private calculateDay(nextDayOffset: number):void {
    const date = this.getDate(this.year, this.month - 1, this.week - 1, this.day);
    const nextDate = addDays(date, nextDayOffset);

    this.year = nextDate.getFullYear();
    this.month = nextDate.getMonth() + 1;
    
    if (this.week !== undefined) {
      this.week = getWeekOfMonth(nextDate);
      this.day = getDay(nextDate) + 1;
    } else {
      this.day = getDate(nextDate);
    }
  }

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
  
  getDayOfThis(): void {
    this.getDay(this.year, this.month - 1, this.week - 1, this.day);
  }

  getDay(year: number, month: number, week: number, day: number): void {
    const date = this.getDate(year, month, week, this.day);

    this.dayService.getDays(date, date)
      .subscribe(days => this.dayItem = days[0]);
  }

  getDate(year: number, month: number, week: number, day: number) {
    let date;
    if (this.week !== undefined) {
      let startOfWeek = this.getStartWeek(year, month, week);
      date = addDays(startOfWeek, day - 1);
    } else {
      date = new Date(year, month, day);
    }
    return date;
  }

  private getStartWeek(year: number, month: number, week: number) {
    let date = new Date(year, month, 1);
    date = startOfWeek(date);
    let start = addWeeks(date, week);
    return start;
  }

}
