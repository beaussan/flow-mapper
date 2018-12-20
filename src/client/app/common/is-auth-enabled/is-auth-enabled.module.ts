import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAuthEnabledDirective } from './is-auth-enabled.directive';

@NgModule({
  declarations: [IsAuthEnabledDirective],
  imports: [CommonModule],
  exports: [IsAuthEnabledDirective],
})
export class IsAuthEnabledModule {}
