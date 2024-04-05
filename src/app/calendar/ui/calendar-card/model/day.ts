import { CalendarEvent } from "./calendar-event";

export interface Day {
    number: number,
    date: Date,
    events: CalendarEvent[],
}
