import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { ThemeService } from './theme.service';
import { LoadingService } from '../app/loading.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PreloaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true; // Starts true for the initial website load

  constructor(
    private themeService: ThemeService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.themeService.init();
    
    this.loadingService.loading$.subscribe(isLoading => {
      // Using setTimeout ensures Angular updates the UI safely in the background
      setTimeout(() => {
        this.loading = isLoading;
      });
    });
  }
}