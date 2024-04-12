import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '../calendar/ui/calendar-card/model/calendar-event';

export type RoleState = {
  events: CalendarEvent[]
}

const initialState = {
  events: [] as CalendarEvent[]
}

@Injectable({
  providedIn: 'root'
})
export class EventStateService {

  constructor() { }

  private state$ = new BehaviorSubject<RoleState>(initialState);

  value$ = this.state$.asObservable();

  addEvent(event: CalendarEvent)
  {
    this.state$.next({
      events: [...this.state$.value.events, event]
    });
  }

  setEvents(events: CalendarEvent[])
  {
    this.state$.next({
      events: events
    });
  }

  removeEvent(roleId: string)
  {
    const updatedRoles = this.state$.value.events.filter((role) => {
      return role.id.toString() !== roleId;
    });

    this.state$.next({
      events: updatedRoles
    });
  }

  updateEvent(updatedEvent: CalendarEvent)
  {
    const updatedEvents = this.state$.value.events.map((event) => {
      return event.id === updatedEvent.id ? updatedEvent : event;
    });

    this.state$.next({
      events: updatedEvents
    });
  }
}
