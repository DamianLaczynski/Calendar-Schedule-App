import { Component, computed, inject } from '@angular/core';
import { CalendarMonthViewComponent } from './ui/calendar-month-view/calendar-month-view.component';
import { CalendarWeekViewComponent } from './ui/calendar-week-view/calendar-week-view.component';
import { CalendarDayViewComponent } from './ui/calendar-day-view/calendar-day-view.component';
import { CalendarListViewComponent } from './ui/calendar-list-view/calendar-list-view.component';
import { CalendarConfigStateService } from '../../config/calendar.state.service';

@Component({
  selector: 'app-calendar-card-body',
  standalone: true,
  imports: [CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarListViewComponent],
  template: `
  <div class="">
  @switch ($view()) {
    @case ('MONTH_VIEW') {
      <app-calendar-month-view></app-calendar-month-view>
    }
    @case ('WEEK_VIEW') {
      <app-calendar-week-view></app-calendar-week-view>
    }
    @case ('DAY_VIEW') {
      <app-calendar-day-view></app-calendar-day-view>
    }
    @case ('LIST_VIEW') {
      <app-calendar-list-view></app-calendar-list-view>
    }
    @default {
      <h1>Error while choosing calendar view. Dev team will fix it soon. </h1>
    }
  }
  </div>
  `
})
export class CalendarCardBodyComponent {
  configStateService = inject(CalendarConfigStateService);

  $view = computed(() => this.configStateService.$value().viewType);

}
