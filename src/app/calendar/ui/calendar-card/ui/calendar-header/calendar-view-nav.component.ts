import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { CalendarViewType } from '../../shared/enums/calendar-view-type.enum';
import { CalendarConfigStateService } from '../../config/calendar.state.service';

@Component({
  selector: 'app-calendar-view-nav',
  standalone: true,
  imports: [],
  template: `
  <div class="d-flex flex-row">
    <button class="btn ms-1 rounded-0 rounded-start" [class]="$view() === 'MONTH_VIEW' ? 'btn-primary' : 'btn-outline-primary'" (click)="changeView.emit('MONTH_VIEW')">Month</button>
    <button class="btn rounded-0" [class]="$view() == 'WEEK_VIEW' ? 'btn-primary' : 'btn-outline-primary'" (click)="changeView.emit('WEEK_VIEW')">Week</button>
    <button class="btn rounded-0" [class]="$view() == 'DAY_VIEW' ? 'btn-primary' : 'btn-outline-primary'" (click)="changeView.emit('DAY_VIEW')">Day</button>
    <button class="btn me-1 rounded-0 rounded-end" [class]="$view() == 'LIST_VIEW' ? 'btn-primary' : 'btn-outline-primary'" (click)="changeView.emit('LIST_VIEW')">List</button>
  </div>
  `
})
export class CalendarViewNavComponent {
  @Output() changeView = new EventEmitter<CalendarViewType>();

  calendarConfigStateService = inject(CalendarConfigStateService);

  $view = computed(() => this.calendarConfigStateService.$value().viewType);

}
