import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseMatchMediaService } from '@fuse/services/match-media.service';

/*tslint:disable:directive-selector */
@Directive({
  selector: '.inner-scroll',
})
/*tslint:enable:directive-selector  */
export class FuseInnerScrollDirective implements OnInit, OnDestroy {
  // Private
  private parent: any;
  private grandParent: any;
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ElementRef} elementRef
   * @param {FuseMatchMediaService} fuseMediaMatchService
   * @param {Renderer2} renderer
   */
  constructor(
    private elementRef: ElementRef,
    private fuseMediaMatchService: FuseMatchMediaService,
    private renderer: Renderer2,
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
    // Get the parent
    this.parent = this.renderer.parentNode(this.elementRef.nativeElement);

    // Return, if there is no parent
    if (!this.parent) {
      return;
    }

    // Get the grand parent
    this.grandParent = this.renderer.parentNode(this.parent);

    // Register to the media query changes
    this.fuseMediaMatchService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(alias => {
        if (alias === 'xs') {
          this.removeClass();
        } else {
          this.addClass();
        }
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Return, if there is no parent
    if (!this.parent) {
      return;
    }

    // Remove the class
    this.removeClass();

    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add the class name
   *
   * @private
   */
  private addClass(): void {
    // Add the inner-scroll class
    this.renderer.addClass(this.grandParent, 'inner-scroll');
  }

  /**
   * Remove the class name
   * @private
   */
  private removeClass(): void {
    // Remove the inner-scroll class
    this.renderer.removeClass(this.grandParent, 'inner-scroll');
  }
}
