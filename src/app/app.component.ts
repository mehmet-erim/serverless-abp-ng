import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { LazyLoadService, LOADING_STRATEGY } from '@abp/ng.core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private confirmation: ConfirmationService,
    private lazyLoadService: LazyLoadService
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
  }
  openConfirmation() {
    this.confirmation.warn('This entity will be deleted!', 'Are you sure?');
  }
}
