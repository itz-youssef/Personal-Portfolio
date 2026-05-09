import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  private fallbackTimer: any;

  show() {
    this.loadingSubject.next(true);
    // Hard fallback: never stay loading more than 6 seconds
    clearTimeout(this.fallbackTimer);
    this.fallbackTimer = setTimeout(() => {
      this.loadingSubject.next(false);
    }, 6000);
  }

  hide() {
    clearTimeout(this.fallbackTimer);
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, 400);
  }
}
