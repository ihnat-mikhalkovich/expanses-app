import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { endOfMonth, endOfWeek, startOfWeek, addWeeks, isSameDay, getDate } from 'date-fns';
import { Day } from '../Day';
import { DayService } from '../day.service';
import { ScrollBarListenerService } from '../scroll-bar-state.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  days: Day[] = [];
  year!: number;
  month!: number;
  maxItemsAmount = 2;

  monthUrl: string = this.location.path();

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
    this.year = Number(this.activatedRoute.snapshot.paramMap.get('year'));
    this.month = Number(this.activatedRoute.snapshot.paramMap.get('month'));
    
    this.getDaysOfThis();
  }

  getAgendaUrl(): string {
    return `/calendar/year/${this.year}/month/${this.month}/agenda`;
  }

  private isCurrentMonth(): boolean {
    const now = new Date();
    return now.getMonth() == this.month - 1;
  }

  getWeekUrl(): string {
    const now = new Date();
    let url: string;
    if (this.isCurrentMonth()) {
      const week = this.getWeekNumberInMonthOfDate(now);
      url = `/calendar/year/${this.year}/month/${this.month}/week/${week - 1}`;
    } else {
      url = `/calendar/year/${this.year}/month/${this.month}/week/1`;
    }
    return url;
  }

  getDateUrl(date: Date): string {
    const url = `/calendar/year/${date.getFullYear()}/month/${date.getMonth() + 1}/day/${getDate(date)}`;
    console.log("result: " + url);
    return url;
  }

  getDayUrl(): string {
    const now = new Date();
    let url: string;
    if (this.isCurrentMonth()) {
      url = `/calendar/year/${this.year}/month/${this.month}/day/${now.getDate()}`;
    } else {
      url = `/calendar/year/${this.year}/month/${this.month}/day/1`;
    }
    return url;
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

  shouldHide(index: number, arraryLength: number): boolean {
    return index > (this.maxItemsAmount - 1) 
      && arraryLength > (this.maxItemsAmount + 1);
  }

  onTodayEvent() {
    let now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;
    this.getDaysOfThis();
    this.updateUrl();
  }

  onBackEvent() {
    if (this.month > 1) {
      this.month--;
    } else {
      this.year--;
      this.month = 12;
    }
    this.getDaysOfThis();
    this.updateUrl();
  }

  onNextEvent() {
    if (this.month < 12) {
      this.month++;
    } else {
      this.year++;
      this.month = 1;
    }
    this.getDaysOfThis();
    this.updateUrl();
  }

  updateUrl(): void {
    this.location.replaceState(`/calendar/year/${this.year}/month/${this.month}`);
  }
  
  isCurrentDate(date: Date): boolean {
    const now = new Date();
    return isSameDay(now, date);
  }

  getDaysOfThis(): void {
    this.getDays(this.year, this.month - 1);
  }

  getDays(year: number, month: number): void {
    let range = this.getStartAndEndOfMonth(year, month);

    this.dayService.getDays(range[0], range[1])
      .subscribe(days => this.days = days);
  }

  private getStartAndEndOfMonth(year: number, month: number) {
    let date = new Date(year, month, 1);
    const start = startOfWeek(date);
    date = endOfMonth(date);
    const end = endOfWeek(date);
    return [start, end];
  }

}
