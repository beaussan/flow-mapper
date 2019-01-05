import {
  Directive,
  Input,
  OnInit,
  HostListener,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseMatchMediaService } from '@fuse/services/match-media.service';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

@Directive({
  selector: '[fuseMatSidenavHelper]',
})
export class FuseMatSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding('class.mat-is-locked-open')
  isLockedOpen: boolean;

  @Input()
  fuseMatSidenavHelper: string;

  @Input()
  matIsLockedOpen: string;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseMatchMediaService} fuseMatchMediaService
   * @param {FuseMatSidenavHelperService} fuseMatSidenavHelperService
   * @param {MatSidenav} matSidenav
   * @param {ObservableMedia} observableMedia
   */
  constructor(
    private fuseMatchMediaService: FuseMatchMediaService,
    private fuseMatSidenavHelperService: FuseMatSidenavHelperService,
    private matSidenav: MatSidenav,
    private observableMedia: ObservableMedia,
  ) {
    // Set the defaults
    this.isLockedOpen = true;

    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Register the sidenav to the service
    this.fuseMatSidenavHelperService.setSidenav(
      this.fuseMatSidenavHelper,
      this.matSidenav,
    );

    if (this.observableMedia.isActive(this.matIsLockedOpen)) {
      this.isLockedOpen = true;
      this.matSidenav.mode = 'side';
      this.matSidenav.toggle(true);
    } else {
      this.isLockedOpen = false;
      this.matSidenav.mode = 'over';
      this.matSidenav.toggle(false);
    }

    this.fuseMatchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        if (this.observableMedia.isActive(this.matIsLockedOpen)) {
          this.isLockedOpen = true;
          this.matSidenav.mode = 'side';
          this.matSidenav.toggle(true);
        } else {
          this.isLockedOpen = false;
          this.matSidenav.mode = 'over';
          this.matSidenav.toggle(false);
        }
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}

@Directive({
  selector: '[fuseMatSidenavToggler]',
})
export class FuseMatSidenavTogglerDirective {
  @Input()
  fuseMatSidenavToggler: string;

  /**
   * Constructor
   *
   * @param {FuseMatSidenavHelperService} fuseMatSidenavHelperService
   */
  constructor(
    private fuseMatSidenavHelperService: FuseMatSidenavHelperService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On click
   */
  @HostListener('click')
  onClick(): void {
    this.fuseMatSidenavHelperService
      .getSidenav(this.fuseMatSidenavToggler)
      .toggle();
  }
}
