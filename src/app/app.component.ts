import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './loading.services';
import { PreloaderComponent } from './preloader/preloader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PreloaderComponent, NavbarComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hidden$ = this.loadingService.loading$.pipe(map(v => !v));

  constructor(public loadingService: LoadingService) {}
}