import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { ThemeService } from './theme.service';
import { LoadingService } from './loading.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PreloaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;

  constructor(
    private themeService: ThemeService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.themeService.init();
    
    this.loadingService.loading$.subscribe(isLoading => {
      this.loading = isLoading;
      this.cdr.detectChanges(); // Forces Angular to show the loader INSTANTLY
    });
  }
}