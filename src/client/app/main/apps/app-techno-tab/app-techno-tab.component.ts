import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppTechnosState } from '../../../state/app-technos.state';
import { AppTechno } from '../../../types/app-technos';
import { Observable } from 'rxjs';

@Component({
  selector: 'fl-app-techno-tab',
  templateUrl: './app-techno-tab.component.html',
  styleUrls: ['./app-techno-tab.component.scss'],
})
export class AppTechnoTabComponent implements OnInit {
  @Select(AppTechnosState.appTechnos)
  appTechnos$: Observable<AppTechno[]>;

  displayedColumns: string[] = ['name', 'actions'];

  constructor() {}

  ngOnInit() {}
}
