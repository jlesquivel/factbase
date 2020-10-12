import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from 'src/environments/environment';
import { JsonService } from '../../services/json.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  APP_TITLE = '';
  menuItems: any;
  sidenavItems: any;

  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private jsonSrv: JsonService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.APP_TITLE = environment.APP_TOOLBAR_TITLE;
    this.loadToolBarOptions();
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  async loadToolBarOptions() {
    let configUrl = `assets/json/too-principal.json`;
    this.menuItems = await this.jsonSrv.getJSON(configUrl);

    configUrl = `assets/json/mnu-admin.json`;
    this.sidenavItems = await this.jsonSrv.getJSON(configUrl);
    // console.log(this.menuItems);
  }
}
