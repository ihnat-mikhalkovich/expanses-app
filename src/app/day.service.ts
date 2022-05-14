import { Injectable } from '@angular/core';
import { generateMockData } from './mock-days';
import { Observable, of } from 'rxjs';
import { Day } from './Day';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  private cachedData: Day[] = [];

  constructor() { }

  getDays(start: Date, end: Date): Observable<Day[]> {
    // if (!this.cachedData.length) {
    if (true) {
      this.cachedData = generateMockData(start, end);
    } 
    return of(this.cachedData);
  }
}
