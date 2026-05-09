import { Component, OnInit } from '@angular/core';
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

  loading = true;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    // اربط الحالة
    this.loadingService.loading$.subscribe(state => {
      this.loading = state;
    });

    // ابدأ التحميل
    this.loadingService.show();

    // اقفل الـ loading بعد ما الصفحة تجهز
    setTimeout(() => {
      this.loadingService.hide();
    }, 1000);
  }
}