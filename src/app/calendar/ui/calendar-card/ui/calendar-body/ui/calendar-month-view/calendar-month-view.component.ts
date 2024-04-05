import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarConfigStateService } from '../../../../config/calendar.state.service';

@Component({
  selector: 'app-calendar-month-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './calendar-month-view.component.html',
  styleUrls: ['./calendar-month-view.component.css'],
})
export class CalendarMonthViewComponent {

  calendarConfigStateService = inject(CalendarConfigStateService);

  $date = computed(() => this.calendarConfigStateService.$value().date);
  $days = computed(() => this.calendarConfigStateService.$value().days);

  constructor() {
    
  }

}
