import {
  AfterContentChecked,
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[fuseIfOnDom]',
})
export class FuseIfOnDomDirective implements AfterContentChecked {
  isCreated: boolean;

  /**
   * Constructor
   *
   * @param {ElementRef} elementRef
   * @param {TemplateRef<any>} templateRef
   * @param {ViewContainerRef} viewContainerRef
   */
  constructor(
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
  ) {
    // Set the defaults
    this.isCreated = false;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * After content checked
   */
  ngAfterContentChecked(): void {
    if (
      document.body.contains(this.elementRef.nativeElement) &&
      !this.isCreated
    ) {
      setTimeout(() => {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }, 300);
      this.isCreated = true;
    } else if (
      this.isCreated &&
      !document.body.contains(this.elementRef.nativeElement)
    ) {
      this.viewContainerRef.clear();
      this.isCreated = false;
    }
  }
}
