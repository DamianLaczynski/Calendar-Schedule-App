import { Component, EventEmitter, Output } from '@angular/core';
import { PageNavAction } from '../../shared/enums/page-nav-action.enum';

@Component({
  selector: 'app-calendar-nav',
  standalone: true,
  imports: [],
  template: ` <div class="">
    <button class="btn btn-primary mx-1" (click)="changePage.emit('PREVIOUS_PAGE')">
      <i class="bi bi-chevron-left"></i>
    </button>
    <button class="btn btn-primary mx-1" (click)="changePage.emit('NEXT_PAGE')">
      <i class="bi bi-chevron-right"></i>
    </button>
    <button class="btn btn-primary mx-3" (click)="goToToday.emit()">Today</button>
  </div>`,
})
export class CalendarNavComponent {
  @Output() changePage = new EventEmitter<PageNavAction>();
  @Output() goToToday = new EventEmitter();

}
