import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scale-bar',
  templateUrl: './scale-bar.component.html',
  styleUrls: ['./scale-bar.component.css']
})
export class ScaleBarComponent implements OnInit {

  @Input() monthUrl!: string;
  @Input() weekUrl!: string;
  @Input() dayUrl!: string;
  @Input() agendaUrl!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.calculateAgendaUrl();
  }

  // calculateAgendaUrl() {
  //   this.agendaUrl = `${this.router.url}/agenda`;
  // }

}
