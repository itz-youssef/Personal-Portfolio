import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './loading.services';
import { PreloaderComponent } from './preloader/preloader.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PreloaderComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef   // ← ADD THIS
  ) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe(state => {
      this.loading = state;
      this.cdr.detectChanges();      // ← ADD THIS
    });
  }
}