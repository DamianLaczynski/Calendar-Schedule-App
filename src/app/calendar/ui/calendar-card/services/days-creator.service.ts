import { Injectable } from '@angular/core';
import { Day } from '../model/day';

@Injectable({
  providedIn: 'root'
})
export class DaysCreatorService {
  weeksInMonth: number = 6;
  daysInWeek: number = 7;

  constructor() { }

  createDaysForMonth(date: Date): Day[][] {
    var days: Day[][] = [];
    var week: Day[] = [];
    var date: Date = new Date(date);
    date.setDate(1);
    var index = 1;
    if (date.getDay() > 1) {
      date.setDate(date.getDate() - (date.getDay() - 1));
    }
    for (let j = 0; j < this.weeksInMonth; j++) {
      for (let i = 0; i < this.daysInWeek; i++) {
        week.push({ number: index++, date: new Date(date), events: [] });
        date.setDate(date.getDate() + 1);
      }
      days.push(week);
      week = [];
    }
    return days;
  }
}
