import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ApiConfigState } from '../../../state/api-config.state';
import { filter, flatMap, map } from 'rxjs/operators';
import { AuthState } from '../../../state/auth.state';

@Directive({
  selector: '[flCanEditFlows]',
})
export class CanEditFlowsDirective {
  isViewDisplayed = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store,
  ) {
    this.store
      .select(ApiConfigState.isReady)
      .pipe(
        filter(val => val),
        flatMap(() => this.store.select(ApiConfigState.isAuthEnabled)),
        flatMap(isAuthEnabled => {
          if (!isAuthEnabled) {
            return of(true);
          }
          return this.store.select(AuthState.hasAlreadyTriedLoginOnce).pipe(
            filter(val => val),
            flatMap(() => this.store.select(AuthState.user)),
            map(user => {
              if (user.isSuperUser) {
                return true;
              }
              return user.roles.map(val => val.key).includes('ROLE_EDIT_FLOW');
            }),
          );
        }),
      )
      .subscribe(isShown => {
        if (isShown) {
          this.showContent();
        } else {
          this.hideContent();
        }
      });
  }

  showContent() {
    if (this.isViewDisplayed) {
      return;
    }
    this.isViewDisplayed = true;
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  hideContent() {
    if (!this.isViewDisplayed) {
      return;
    }
    this.isViewDisplayed = false;
    this.viewContainer.clear();
  }
}
