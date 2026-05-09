import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PreloaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;
  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.themeService.init();
    setTimeout(() => this.loading = false, 800);
  }
}
