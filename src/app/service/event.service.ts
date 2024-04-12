import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { toObservable } from "@angular/core/rxjs-interop";
import { EventStateService } from './event.state.service';
import { EventApiService } from './event.api.service';
import { createListState } from '../calendar/utils/create-list-state';
import { EventCreatePayload } from '../calendar/ui/calendar-card/model/event-create-payload';
import { EventUpdatePayload } from '../calendar/ui/calendar-card/model/event-update-payload';


type FetchingError = { message: string, status: number };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private httpService = inject(EventApiService);
  private state = inject(EventStateService);

  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.events,
  );

  getAll() {
    this.httpService
      .getAll()
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setEvents(response.body);
          }
        })
      )
      .subscribe();
  }

  getById(id: string) {
    this.httpService
      .getById(id)
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.addEvent(response.body);
          }
        })
      )
      .subscribe();
  }

  create(newRole: EventCreatePayload) {
    return this.httpService.create(newRole).pipe(
      tap((response) => {
        if(response)
          {
            this.state.addEvent(response);
          }
      })
    ).subscribe();
  }

  update(
    id: string,
    payload: EventUpdatePayload
  ) {
    return this.httpService.update(id, payload).pipe(
      tap((role) => {
        this.state.updateEvent(role);
      })
    );
  }

  delete(id: string) {
    return this.httpService.delete(id).pipe(
      tap(() => {
        this.state.removeEvent(id);
      })
    );
  }
}
