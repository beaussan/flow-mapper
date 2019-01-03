import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { combineLatest, Observable } from 'rxjs';
import { Actions, Select, Store } from '@ngxs/store';
import { ApiConfigState } from '../../../state/api-config.state';
import { map } from 'rxjs/operators';
import { AuthLoginRequest } from '../../../state/auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  @Select(ApiConfigState.isLocalRegisterEnabled)
  isLocalRegisterEnabled$: Observable<boolean>;

  @Select(ApiConfigState.isFacebookAuthEnabled)
  isFacebookRegisterEnabled$: Observable<boolean>;

  @Select(ApiConfigState.isTwitterAuthEnabled)
  isTwitterRegisterEnabled$: Observable<boolean>;

  @Select(ApiConfigState.isGoogleAuthEnabled)
  isGoogleRegisterEnabled$: Observable<boolean>;

  hasSocialEnable$: Observable<boolean>;

  isLogging$: Observable<boolean>;
  /**
   * Constructor
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private store: Store,
    private action$: Actions
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        toolbar: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: true,
        },
      },
    };
    
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.hasSocialEnable$ = combineLatest(
      this.isTwitterRegisterEnabled$,
      this.isGoogleRegisterEnabled$,
      this.isFacebookRegisterEnabled$,
    ).pipe(map(arr => arr.reduce((prev, curr) => prev && curr, true)));

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    this.store.dispatch(
      new AuthLoginRequest(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value,
      ),
    );
  }
}
