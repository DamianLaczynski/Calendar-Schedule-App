import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { CalendarEvent } from '../calendar/ui/calendar-card/model/calendar-event';
import { EventCreatePayload } from '../calendar/ui/calendar-card/model/event-create-payload';
import { EventUpdatePayload } from '../calendar/ui/calendar-card/model/event-update-payload';

export type FetchingError = { status: number; message: string };

@Injectable({
  providedIn: 'root',
})
export class EventApiService {
  private _http = inject(HttpClient);
  readonly apiEndpoint: string = 'http://localhost:3000/events';

  private $idle = signal(true);
  private $loading = signal(false);
  private $error = signal<FetchingError | null>(null);

  $loadingState = computed(() => {
    return {
      idle: this.$idle(),
      loading: this.$loading(),
      error: this.$error(),
    };
  });

  withLoadingState<T>(source$: Observable<T>): Observable<T> {
    this.$idle.set(false);
    this.$error.set(null);
    this.$loading.set(true);

    return source$.pipe(
      catchError((e: HttpErrorResponse) => {
        this.$error.set({ message: e.message, status: e.status });
        this.$loading.set(false);

        return EMPTY;
      }),
      tap(() => {
        this.$loading.set(false);
      })
    );
  }

  getById(id: string) {
    return this.withLoadingState(
      this._http.get<CalendarEvent>(`${this.apiEndpoint}/${id}`, {
        observe: 'response',
      })
    );
  }
  getAll() {
    return this.withLoadingState(
      this._http.get<any>(this.apiEndpoint, {
        observe: 'response',
      })
    );
  }

  create(payload: EventCreatePayload) {
    return this.withLoadingState(
      this._http.post<CalendarEvent>(`${this.apiEndpoint}`, payload)
    )
  }

  update(id: string, payload: EventUpdatePayload) {
    return this.withLoadingState(
      this._http.put<CalendarEvent>(`${this.apiEndpoint}/${id}`, payload)
    );
  }

  delete(id: string) {
    return this.withLoadingState(
      this._http.delete<any>(`${this.apiEndpoint}/${id}`)
    );
  }
}
