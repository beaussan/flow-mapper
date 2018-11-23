import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style,
} from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FuseSplashScreenService {
  splashScreenEl: any;
  player: AnimationPlayer;

  /**
   * Constructor
   *
   * @param {AnimationBuilder} animationBuilder
   * @param document
   * @param {Router} router
   */
  constructor(
    private animationBuilder: AnimationBuilder,
    @Inject(DOCUMENT) private document: any,
    private router: Router,
  ) {
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
    // Get the splash screen element
    this.splashScreenEl = this.document.body.querySelector(
      '#fuse-splash-screen',
    );

    // If the splash screen element exists...
    if (this.splashScreenEl) {
      // Hide it on the first NavigationEnd event
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          take(1),
        )
        .subscribe(() => {
          setTimeout(() => {
            this.hide();
          });
        });
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Show the splash screen
   */
  show(): void {
    this.player = this.animationBuilder
      .build([
        style({
          opacity: '0',
          zIndex: '99999',
        }),
        animate('400ms ease', style({ opacity: '1' })),
      ])
      .create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  /**
   * Hide the splash screen
   */
  hide(): void {
    this.player = this.animationBuilder
      .build([
        style({ opacity: '1' }),
        animate(
          '400ms ease',
          style({
            opacity: '0',
            zIndex: '-10',
          }),
        ),
      ])
      .create(this.splashScreenEl);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }
}
