import { Component, computed, inject } from '@angular/core';
import { CalendarViewNavComponent } from './calendar-view-nav.component';
import { CalendarNavComponent } from './calendar-nav.component';
import { CalendarConfigStateService } from '../../config/calendar.state.service';
import {
  CALENDAR_VIEW_TYPE,
  CalendarViewType,
} from '../../shared/enums/calendar-view-type.enum';
import {
  PAGE_NAV_ACTION,
  PageNavAction,
} from '../../shared/enums/page-nav-action.enum';

@Component({
  selector: 'app-calendar-card-header',
  standalone: true,
  imports: [CalendarViewNavComponent, CalendarNavComponent],
  template: `
    <div class="d-flex justify-content-between m-2 align-items-center">
      <app-calendar-nav
        (changePage)="changePage($event)"
        (goToToday)="goToToday()"
      ></app-calendar-nav>
      @if ($title()) {
      <h1>{{ $title() }}</h1>
      }
      <app-calendar-view-nav
        (changeView)="changeView($event)"
      ></app-calendar-view-nav>
    </div>
  `,
})
export class CalendarCardHeaderComponent {
  calendarConfigStateService = inject(CalendarConfigStateService);

  $title = computed(() => this.calendarConfigStateService.$value().title);
  $date = computed(() => this.calendarConfigStateService.$value().date);
  $view = computed(() => this.calendarConfigStateService.$value().viewType);

  changeView(calendarView: CalendarViewType) {
    this.calendarConfigStateService.updateCalendarViewType(calendarView);
  }

  changePage(pageNavAction: PageNavAction) {
    let date = new Date(this.$date());
    switch (pageNavAction) {
      case PAGE_NAV_ACTION.PREVIOUS_PAGE:
        switch (this.$view()) {
          case CALENDAR_VIEW_TYPE.MONTH_VIEW:
            date.setMonth(this.$date().getMonth() - 1);
            this.calendarConfigStateService.updateCalendarCurrentDate(date);
            break;
          case CALENDAR_VIEW_TYPE.WEEK_VIEW:
            date.setDate(this.$date().getDate() - 7);
            this.calendarConfigStateService.updateCalendarCurrentDate(date);
            break;
          case CALENDAR_VIEW_TYPE.DAY_VIEW:
            date.setDate(this.$date().getDate() - 1);
            this.calendarConfigStateService.updateCalendarCurrentDate(date);
            break;
          case CALENDAR_VIEW_TYPE.LIST_VIEW:
            break;
        }
        break;
      case PAGE_NAV_ACTION.NEXT_PAGE:
        switch (this.$view()) {
          case CALENDAR_VIEW_TYPE.MONTH_VIEW:
            date.setMonth(date.getMonth() + 1);
            this.calendarConfigStateService.updateCalendarCurrentDate(date);
            break;
          case CALENDAR_VIEW_TYPE.WEEK_VIEW:
            date.setDate(this.$date().getDate() + 7);
            this.calendarConfigStateService.updateCalendarCurrentDate(date);
            break;
          case CALENDAR_VIEW_TYPE.DAY_VIEW:
            date.setDate(this.$date().getDate() + 1);
            this.calendarConfigStateService.updateCalendarCurrentDate(date);
            break;
          case CALENDAR_VIEW_TYPE.LIST_VIEW:
            break;
        }
        break;
    }
  }

  goToToday() {
    this.calendarConfigStateService.updateCalendarCurrentDate(
      new Date(Date.now())
    );
  }
}
