import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseMatchMediaService } from '@fuse/services/match-media.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
  selector: 'fuse-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss'],
})
export class FuseShortcutsComponent implements OnInit, OnDestroy {
  shortcutItems: any[];
  navigationItems: any[];
  filteredNavigationItems: any[];
  searching: boolean;
  mobileShortcutsPanelActive: boolean;

  @Input()
  navigation: any;

  @ViewChild('searchInput')
  searchInputField;

  @ViewChild('shortcuts')
  shortcutsEl: ElementRef;

  // Private
  private unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Renderer2} renderer
   * @param {CookieService} cookieService
   * @param {FuseMatchMediaService} fuseMatchMediaService
   * @param {FuseNavigationService} fuseNavigationService
   * @param {ObservableMedia} observableMedia
   */
  constructor(
    private cookieService: CookieService,
    private fuseMatchMediaService: FuseMatchMediaService,
    private fuseNavigationService: FuseNavigationService,
    private observableMedia: ObservableMedia,
    private renderer: Renderer2,
  ) {
    // Set the defaults
    this.shortcutItems = [];
    this.searching = false;
    this.mobileShortcutsPanelActive = false;

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
    // Get the navigation items and flatten them
    this.filteredNavigationItems = this.navigationItems = this.fuseNavigationService.getFlatNavigation(
      this.navigation,
    );

    if (this.cookieService.check('FUSE2.shortcuts')) {
      this.shortcutItems = JSON.parse(
        this.cookieService.get('FUSE2.shortcuts'),
      );
    } else {
      // User's shortcut items
      this.shortcutItems = [
        {
          title: 'Calendar',
          type: 'item',
          icon: 'today',
          url: '/apps/calendar',
        },
        {
          title: 'Mail',
          type: 'item',
          icon: 'email',
          url: '/apps/mail',
        },
        {
          title: 'Contacts',
          type: 'item',
          icon: 'account_box',
          url: '/apps/contacts',
        },
        {
          title: 'To-Do',
          type: 'item',
          icon: 'check_box',
          url: '/apps/todo',
        },
      ];
    }

    // Subscribe to media changes
    this.fuseMatchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        if (this.observableMedia.isActive('gt-sm')) {
          this.hideMobileShortcutsPanel();
        }
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Search
   *
   * @param event
   */
  search(event): void {
    const value = event.target.value.toLowerCase();

    if (value === '') {
      this.searching = false;
      this.filteredNavigationItems = this.navigationItems;

      return;
    }

    this.searching = true;

    this.filteredNavigationItems = this.navigationItems.filter(
      navigationItem => {
        return navigationItem.title.toLowerCase().includes(value);
      },
    );
  }

  /**
   * Toggle shortcut
   *
   * @param event
   * @param itemToToggle
   */
  toggleShortcut(event, itemToToggle): void {
    event.stopPropagation();

    for (let i = 0; i < this.shortcutItems.length; i++) {
      if (this.shortcutItems[i].url === itemToToggle.url) {
        this.shortcutItems.splice(i, 1);

        // Save to the cookies
        this.cookieService.set(
          'FUSE2.shortcuts',
          JSON.stringify(this.shortcutItems),
        );

        return;
      }
    }

    this.shortcutItems.push(itemToToggle);

    // Save to the cookies
    this.cookieService.set(
      'FUSE2.shortcuts',
      JSON.stringify(this.shortcutItems),
    );
  }

  /**
   * Is in shortcuts?
   *
   * @param navigationItem
   * @returns {any}
   */
  isInShortcuts(navigationItem): any {
    return this.shortcutItems.find(item => {
      return item.url === navigationItem.url;
    });
  }

  /**
   * On menu open
   */
  onMenuOpen(): void {
    setTimeout(() => {
      this.searchInputField.nativeElement.focus();
    });
  }

  /**
   * Show mobile shortcuts
   */
  showMobileShortcutsPanel(): void {
    this.mobileShortcutsPanelActive = true;
    this.renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
  }

  /**
   * Hide mobile shortcuts
   */
  hideMobileShortcutsPanel(): void {
    this.mobileShortcutsPanelActive = false;
    this.renderer.removeClass(
      this.shortcutsEl.nativeElement,
      'show-mobile-panel',
    );
  }
}
