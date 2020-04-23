import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-showcase',
  templateUrl: 'showcase.component.html'
})
export class ShowcaseComponent {
  constructor(
    private confirmation: ConfirmationService,
  ) {}

  openConfirmation() {
    this.confirmation.warn('This entity will be deleted!', 'Are you sure?');
  }
}
