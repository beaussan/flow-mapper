import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchAllAppTechnoRequest } from '../../state/app-technos.actions';
import { FetchAllAppRequest } from '../../state/app.actions';

@Component({
  selector: 'fl-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss'],
})
export class AppsComponent implements OnInit {
  constructor(private store: Store) {
    this.store.dispatch(new FetchAllAppTechnoRequest());
    this.store.dispatch(new FetchAllAppRequest());
  }

  ngOnInit() {}
}
