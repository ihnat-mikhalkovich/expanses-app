import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addWeeks, startOfWeek } from 'date-fns';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scroll-bar',
  templateUrl: './scroll-bar.component.html',
  styleUrls: ['./scroll-bar.component.css']
})
export class ScrollBarComponent implements OnInit {

  @Output() todayEvent = new EventEmitter();
  @Output() backEvent = new EventEmitter();
  @Output() nextEvent = new EventEmitter();

  path: string = '';
  paramsNames: string[] = [];

  todayUrl: string = '';
  backUrl: string = '';
  nextUrl: string = '';

  constructor(
    private activatedRoute: ActivatedRoute, 
    private location: Location
  ) { }

  ngOnInit(): void {
    let paramMap = this.activatedRoute.snapshot.paramMap;
    this.paramsNames = paramMap.keys;

    this.getTodayUrl();
    this.getNextUrl();
    this.getBackUrl();
  }

  onTodayClick() {
    // this.location.replaceState(this.todayUrl);
    this.todayEvent.emit();
  }

  onBackClick() {
    this.backEvent.emit();
  }

  onNextClick() {
    this.nextEvent.emit();
  }

  getTodayUrl(): void {
    let url = this.activatedRoute.snapshot.routeConfig?.path;
    if (!url) {
      return;
    }
    let now = new Date();
    let paramMap = this.activatedRoute.snapshot.paramMap;
    let args: number[] = [];

    if (paramMap.has('year')) {
      args.push(now.getFullYear());
    }
    if (paramMap.has('month')) {
      args.push(now.getMonth() + 1);
    }
    if (paramMap.has('week')) {
      let weekNumber = this.getWeekNumberInMonthOfDate(now);
      args.push(weekNumber);
    }
    if (paramMap.has('day')) {
      args.push(now.getDate());
    }

    let todayUrl = this.applyToUrl(url, args);
    this.todayUrl = '/' + todayUrl;
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

  private applyToUrl(url: string, params: number[]): string {
    this.paramsNames.forEach((name, i, array) => {
      url = url.replace(`:${name}`, `${params[i]}`);
    });
    return url;
  }

  getNextUrl(): void {
    let url = this.activatedRoute.snapshot.routeConfig?.path;
    if (!url) {
      return;
    }
    let paramMap = this.activatedRoute.snapshot.paramMap;
    let args: number[] = [];

    if (paramMap.has('year')) {
      let year = Number(paramMap.get('year'));
      args.push(year);
    }
    if (paramMap.has('month')) {
      let month = Number(paramMap.get('month'));
      args.push(month);
    }
    if (paramMap.has('week')) {
      let week = Number(paramMap.get('week'));
      args.push(week);
    }
    if (paramMap.has('day')) {
      let day = Number(paramMap.get('day'));
      args.push(day);
    }

    let lastValue = args.pop();
    if (!!lastValue) {
      lastValue++;
      args.push(lastValue);
    }

    let nextUrl = this.applyToUrl(url, args);
    this.nextUrl = '/' + nextUrl;
  }

  getBackUrl(): void {
    let url = this.activatedRoute.snapshot.routeConfig?.path;
    if (!url) {
      return;
    }
    let paramMap = this.activatedRoute.snapshot.paramMap;
    let args: number[] = [];

    if (paramMap.has('year')) {
      let year = Number(paramMap.get('year'));
      args.push(year);
    }
    if (paramMap.has('month')) {
      let month = Number(paramMap.get('month'));
      args.push(month);
    }
    if (paramMap.has('week')) {
      let week = Number(paramMap.get('week'));
      args.push(week);
    }
    if (paramMap.has('day')) {
      let day = Number(paramMap.get('day'));
      args.push(day);
    }

    let lastValue = args.pop();
    if (!!lastValue) {
      lastValue--;
      args.push(lastValue);
    }

    let back = this.applyToUrl(url, args);
    this.backUrl = '/' + back;
  }
}
