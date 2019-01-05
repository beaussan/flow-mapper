import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginFailure } from '../state/auth.actions';

interface ToastableItem {
  translationKey: string;
  action: any;
  level: 'info' | 'error';
}

const toasts: ToastableItem[] = [
  {
    action: AuthLoginFailure,
    level: 'error',
    translationKey: 'An error while login as occurred',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  override = {};

  constructor(
    private readonly toastr: ToastrService,
    private readonly actions$: Actions,
    private readonly translate: TranslateService,
  ) {}

  public setupToasters() {
    for (const toast of toasts) {
      this.actions$.pipe(ofActionDispatched(toast.action)).subscribe(() => {
        setTimeout(() => {
          if (toast.level === 'info') {
            this.successNoTranslate(toast.translationKey);
          } else if (toast.level === 'error') {
            this.errorNoTranslate(toast.translationKey);
          }
        });
      });
    }
  }

  public success(translationKey: string) {
    setTimeout(() => {
      const text = this.translate.instant(translationKey);
      this.toastr.success(text, undefined, this.override);
    });
  }

  public successNoTranslate(text: string) {
    setTimeout(() => {
      this.toastr.success(text, undefined, this.override);
    });
  }

  public error(translationKey: string) {
    setTimeout(() => {
      const text = this.translate.instant(translationKey);
      this.toastr.error(text, undefined, this.override);
    });
  }

  public errorNoTranslate(text: string) {
    setTimeout(() => {
      this.toastr.error(text, undefined, this.override);
    });
  }
}
