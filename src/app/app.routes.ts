import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.page.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/calendar', pathMatch: 'full'
    },
    {
        path: 'calendar', component: CalendarComponent
    },
    {
        path: '**', redirectTo: '/calendar'
    }
];
