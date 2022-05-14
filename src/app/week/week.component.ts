import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { endOfMonth, endOfWeek, startOfWeek, addWeeks, isSameDay, getDay } from 'date-fns';
import { Day } from '../Day';
import { DayService } from '../day.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  days: Day[] = [];
  
  year!: number;
  month!: number;
  week!: number;

  weekUrl: string = this.location.path();

  maxItemsAmount = 10;

  weekDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];

  constructor(
    private dayService: DayService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.year = Number(this.activatedRoute.snapshot.paramMap.get('year'));
    this.month = Number(this.activatedRoute.snapshot.paramMap.get('month'));
    this.week = Number(this.activatedRoute.snapshot.paramMap.get('week'));
    this.getDaysOfThis();
  }

  onTodayEvent() {
    let now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    this.week = this.getWeekNumberInMonthOfDate(now);
    this.getDaysOfThis();
    this.updateUrl();
  }

  onBackEvent() {
    this.week--;
    this.getDaysOfThis();
    this.updateUrl();
  }

  onNextEvent() {
    this.week++;
    this.getDaysOfThis();
    this.updateUrl();
  }

  updateUrl() {
    this.location.replaceState(`/calendar/year/${this.year}/month/${this.month}/week/${this.week}`);
  }

  private isCurrentWeek(): boolean {
    const now = new Date();
    const week = this.getWeekNumberInMonthOfDate(now);
    return week == this.week - 1;
  }

  getDateUrl(date: Date): string {
    return `/calendar/year/${date.getFullYear()}/month/${date.getMonth() + 1}/week/${this.getWeekNumberInMonthOfDate(date) - 1}/day/${getDay(date) + 1}`;
  }

  getDayUrl(): string {
    const now = new Date();
    let url: string;
    if (this.isCurrentWeek()) {
      url = `/calendar/year/${this.year}/month/${this.month}/week/${this.week}/day/${now.getDate()}`;
    } else {
      url = `/calendar/year/${this.year}/month/${this.month}/week/${this.week}/day/1`;
    }
    return url;
  }

  getMonthUrl(): string { 
    const range = this.getStartAndEndOfWeek(this.year, this.month, this.week);
    const start = range[0];
    const end = range[1];
    if (start.getMonth() > end.getMonth()) {
      return `/calendar/year/${this.year}/month/${end.getMonth()}`
    } else if (start.getMonth() < end.getMonth()) {
      return `/calendar/year/${this.year}/month/${start.getMonth()}`
    } else {
      return `/calendar/year/${this.year}/month/${this.month}`
    }
  }

  private getWeekNumberInMonthOfDate(date: Date): number {
    let weekNumber = 1;
    let weekStart = startOfWeek(date);
    while(date.getMonth() == weekStart.getMonth()) {
      weekStart = addWeeks(weekStart, -1);
      weekNumber++;
    }
    return weekNumber;
  }

  isCurrentDate(date: Date): boolean {
    const now = new Date();
    return isSameDay(now, date);
  }

  shouldHide(index: number, arraryLength: number): boolean {
    return index > (this.maxItemsAmount - 1) 
      && arraryLength > (this.maxItemsAmount + 1);
  }
  
  getDaysOfThis(): void {
    this.getDays(this.year, this.month - 1, this.week - 1);
  }

  getDays(year: number, month: number, week: number): void {
    const range: Date[] = this.getStartAndEndOfWeek(year, month, week)
    this.dayService.getDays(range[0], range[1])
      .subscribe(days => this.days = days);
  }

  private getStartAndEndOfWeek(year: number, month: number, week: number) {
    let date = new Date(year, month, 1);
    date = startOfWeek(date);
    let start = addWeeks(date, week);
    let end = endOfWeek(start);
    return [start, end];
  }

}
