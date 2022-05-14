import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScrollBarListenerService } from '../scroll-bar-state.service';

@Component({
  selector: 'app-scroll-bar',
  templateUrl: './scroll-bar.component.html',
  styleUrls: ['./scroll-bar.component.css']
})
export class ScrollBarComponent implements OnInit {

  constructor(private stateService: ScrollBarListenerService) { }

  ngOnInit(): void {
  }

  onTodayClick() {
    this.stateService.todayPressed();
  }

  onBackClick() {
    this.stateService.backPressed();
  }

  onNextClick() {
    this.stateService.nextPressed();
  }
}
