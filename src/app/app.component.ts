import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { LazyLoadService, LOADING_STRATEGY } from '@abp/ng.core';
import { forkJoin } from 'rxjs';
import { Store } from '@ngxs/store';
import mockData from './app-configuration-data';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(
    private confirmation: ConfirmationService,
    private lazyLoadService: LazyLoadService,
    private store: Store
  ) {}

  ngOnInit() {
    forkJoin([
      this.lazyLoadService.load(
        LOADING_STRATEGY.PrependAnonymousStyleToHead(
          'fontawesome-v4-shims.min.css'
        )
      ),
      this.lazyLoadService.load(
        LOADING_STRATEGY.PrependAnonymousStyleToHead('fontawesome-all.min.css')
      ),
    ]).subscribe();

    this.store.reset({
      ...this.store.selectSnapshot((s) => s),
      ConfigState: mockData,
    });
  }

  openConfirmation() {
    this.confirmation.warn('This entity will be deleted!', 'Are you sure?');
  }
}
