import { Component, Input, computed, inject } from '@angular/core';
import { CalendarCardHeaderComponent } from './ui/calendar-header/calendar-card-header.component';
import { CalendarCardBodyComponent } from './ui/calendar-body/calendar-card-body.component';
import { CalendarEvent } from './model/calendar-event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar-card',
  standalone: true,
  imports: [CalendarCardHeaderComponent, CalendarCardBodyComponent],
  providers: [DatePipe],
  template: `
    <app-calendar-card-header></app-calendar-card-header>
    <app-calendar-card-body></app-calendar-card-body>
  `,
})
export class CalendarCardComponent {
  @Input() events?: CalendarEvent;
}
