import { Component } from '@angular/core';
import { CalendarCardComponent } from './ui/calendar-card/calendar-card.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarCardComponent],
  template: `
  <div class="container">
    <app-calendar-card></app-calendar-card>
  </div>
  `
})
export class CalendarComponent {

}
