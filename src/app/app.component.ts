import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationStart } from '@angular/router';
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
  loading = true;

  constructor(
    private themeService: ThemeService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }
    });
  }

  ngOnInit() {
    this.themeService.init();
    
    this.loadingService.loading$.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }
}