import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationItem } from '../../../../types/index';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
  selector: 'fuse-nav-vertical-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class FuseNavVerticalGroupComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  classes = 'nav-group nav-item';

  @Input()
  item: FuseNavigationItem;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   */

  /**
   *
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {FuseNavigationService} fuseNavigationService
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private fuseNavigationService: FuseNavigationService,
  ) {
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
    // Subscribe to navigation item
    merge(
      this.fuseNavigationService.onNavigationItemAdded,
      this.fuseNavigationService.onNavigationItemUpdated,
      this.fuseNavigationService.onNavigationItemRemoved,
    )
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        // Mark for check
        this.changeDetectorRef.markForCheck();
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
