import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FuseMatchMediaService {
  activeMediaQuery: string;
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Constructor
   *
   * @param {ObservableMedia} observableMedia
   */
  constructor(private observableMedia: ObservableMedia) {
    // Set the defaults
    this.activeMediaQuery = '';

    // Initialize
    this.init();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Initialize
   *
   * @private
   */
  private init(): void {
    this.observableMedia
      .asObservable()
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((change: MediaChange) => {
        if (this.activeMediaQuery !== change.mqAlias) {
          this.activeMediaQuery = change.mqAlias;
          this.onMediaChange.next(change.mqAlias);
        }
      });
  }
}
