import { DatePipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { CalendarViewType } from '../shared/enums/calendar-view-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TitleTransformerService {

  datePipe = inject(DatePipe);

  constructor() { }

  changeTitle(date: Date, view: CalendarViewType): string | null {
    switch (view) {
      case 'MONTH_VIEW':
        return this.datePipe.transform(date, 'MMMM YYYY');
        break;
      case 'WEEK_VIEW':
        return this.datePipe.transform(date, "ww. 'Week' YYYY");
        break;
      case 'DAY_VIEW':
        return this.datePipe.transform(date, 'dd MMMM YYYY');
        break;
      case 'LIST_VIEW':
        return 'List view';
        break;
      default:
        return '';
        break;
    }
  }
}
