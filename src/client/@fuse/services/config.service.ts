import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

// Create the injection token for the custom settings
export const FUSE_CONFIG = new InjectionToken('fuseCustomConfig');

@Injectable({
  providedIn: 'root',
})
export class FuseConfigService {
  // Private
  private configSubject: BehaviorSubject<any>;
  private readonly _defaultConfig: any;

  /**
   * Constructor
   *
   * @param {Platform} platform
   * @param {Router} router
   * @param _config
   */
  constructor(
    private platform: Platform,
    private router: Router,
    @Inject(FUSE_CONFIG) private _config,
  ) {
    // Set the default config from the user provided config (from forRoot)
    this._defaultConfig = _config;

    // Initialize the service
    this.init();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set and get the config
   */
  set config(value) {
    // Get the value from the behavior subject
    let config = this.configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // Notify the observers
    this.configSubject.next(config);
  }

  get config(): any | Observable<any> {
    return this.configSubject.asObservable();
  }

  /**
   * Get default config
   *
   * @returns {any}
   */
  get defaultConfig(): any {
    return this._defaultConfig;
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
    /**
     * Disable custom scrollbars if browser is mobile
     */
    if (this.platform.ANDROID || this.platform.IOS) {
      this._defaultConfig.customScrollbars = false;
    }

    // Set the config from the default config
    this.configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));

    // Reload the default layout config on every RoutesRecognized event
    // if the current layout config is different from the default one
    this.router.events
      .pipe(filter(event => event instanceof RoutesRecognized))
      .subscribe(() => {
        if (
          !_.isEqual(
            this.configSubject.getValue().layout,
            this._defaultConfig.layout,
          )
        ) {
          // Clone the current config
          const config = _.cloneDeep(this.configSubject.getValue());

          // Reset the layout from the default config
          config.layout = _.cloneDeep(this._defaultConfig.layout);

          // Set the config
          this.configSubject.next(config);
        }
      });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set config
   *
   * @param value
   * @param {{emitEvent: boolean}} opts
   */
  setConfig(value, opts = { emitEvent: true }): void {
    // Get the value from the behavior subject
    let config = this.configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // If emitEvent option is true...
    if (opts.emitEvent === true) {
      // Notify the observers
      this.configSubject.next(config);
    }
  }

  /**
   * Get config
   *
   * @returns {Observable<any>}
   */
  getConfig(): Observable<any> {
    return this.configSubject.asObservable();
  }

  /**
   * Reset to the default config
   */
  resetToDefaults(): void {
    // Set the config from the default config
    this.configSubject.next(_.cloneDeep(this._defaultConfig));
  }
}
