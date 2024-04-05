import { Injectable, inject, signal } from '@angular/core';
import {
  CALENDAR_VIEW_TYPE,
  CalendarViewType,
} from '../shared/enums/calendar-view-type.enum';
import { Day } from '../model/day';
import { DaysCreatorService } from '../services/days-creator.service';
import { TitleTransformerService } from '../services/title-transformer.service';

type CalendarConfigState = {
  viewType: CalendarViewType;
  date: Date;
  title?: string | null;
  days?: Day[][];
};

@Injectable({
  providedIn: 'root',
})
export class CalendarConfigStateService {

  daysCreator = inject(DaysCreatorService);
  titleTransformer = inject(TitleTransformerService);

  private state = signal<CalendarConfigState>({
    viewType: CALENDAR_VIEW_TYPE.MONTH_VIEW,
    date: new Date(Date.now()),
    title: '',
    days: this.daysCreator.createDaysForMonth(new Date(Date.now()))
  });

  $value = this.state.asReadonly();

  constructor() {
    this.updateCalendarTitle();
  }

  updateCalendarViewType(value: CalendarViewType) {
    this.state.update((state) => {
      return {
        ...state,
        viewType: value,
      };
    });
    this.updateCalendarTitle();
  }

  updateCalendarCurrentDate(value: Date) {
    this.state.update((state) => {
      return {
        ...state,
        date: value,
      };
    });
    this.updateCalendarTitle();
    this.updateCalendarDays();
  }

  private updateCalendarTitle() {
    let value = this.titleTransformer.changeTitle(this.$value().date, this.$value().viewType);
    this.state.update((state) => {
      return {
        ...state,
        title: value,
      };
    });
  }

  private updateCalendarDays() {
    let value = this.daysCreator.createDaysForMonth(this.$value().date);
    this.state.update((state) => {
      return {
        ...state,
        days: value,
      };
    });
  }

}
