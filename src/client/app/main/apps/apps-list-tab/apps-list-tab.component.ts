import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppTechnosState } from '../../../state/app-technos.state';
import { AppState } from '../../../state/app.state';
import { Observable } from 'rxjs';
import { App } from '../../../types/app';

@Component({
  selector: 'fl-apps-list-tab',
  templateUrl: './apps-list-tab.component.html',
  styleUrls: ['./apps-list-tab.component.scss'],
})
export class AppsListTabComponent implements OnInit {
  @Select(AppState.apps)
  apps$: Observable<App[]>;

  displayedColumns: string[] = ['name', 'description', 'actions'];
  constructor() {}

  ngOnInit() {}
}
