import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="preloader" *ngIf="!hidden">
      <div class="loader-container">
        <div class="spinner"></div>
        <p>Loading</p>
      </div>
    </div>
  `
})
export class PreloaderComponent {
  @Input() hidden = false;
}