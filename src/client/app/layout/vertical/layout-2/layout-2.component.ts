import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/navigation/navigation';

@Component({
  selector: 'vertical-layout-2',
  templateUrl: './layout-2.component.html',
  styleUrls: ['./layout-2.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerticalLayout2Component implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} fuseConfigService
   */
  constructor(private fuseConfigService: FuseConfigService) {
    // Set the defaults
    this.navigation = navigation;

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
    // Subscribe to config changes
    this.fuseConfigService.config
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(config => {
        this.fuseConfig = config;
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
