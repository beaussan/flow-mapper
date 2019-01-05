import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ApiConfigState } from '../../state/api-config.state';

@Directive({
  selector: '[flIsAuthEnabled]',
})
export class IsAuthEnabledDirective implements OnInit, OnDestroy {
  isViewDisplayed = false;

  @Select(ApiConfigState.isAuthEnabled)
  isAuthEnabled$: Observable<boolean>;

  subscription = new Subscription();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.isAuthEnabled$.subscribe(isAuthEnabled => {
        if (isAuthEnabled) {
          this.showContent();
        } else {
          this.hideContent();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
