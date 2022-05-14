import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { BehaviorSubjectItem } from './behavior-subject-item';

@Injectable({
  providedIn: 'root'
})
export class ScrollBarListenerService {

  backButton: BehaviorSubjectItem<false> = new BehaviorSubjectItem(false);
  todayButton: BehaviorSubjectItem<false> = new BehaviorSubjectItem(false);
  nextButton: BehaviorSubjectItem<false> = new BehaviorSubjectItem(false);

  constructor() { }

  public subscribeOnScrollBar(onToday: () => void, onBack: () => void, onNext: () => void) {
    this.backButton.value$
      .subscribe(onBack);
    this.nextButton.value$
      .subscribe(onNext);
    this.todayButton.value$
      .subscribe(onToday);
  }

  public backPressed() {
    this.backButton.value = false;
  }

  public todayPressed() {
    this.todayButton.value = false;
  }

  public nextPressed() {
    this.nextButton.value = false;
  }

}
