import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SheetsService } from '../sheets.service';
import { GithubService } from '../github.service';
import { LoadingService } from '../loading.services';
import { forkJoin } from 'rxjs';
import { finalize, timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  heroName = '';
  heroDesc = '';
  profileImg = '';
  featured: any = null;
  experience: any[] = [];
  mainProjects: any[] = [];
  githubRepos: any[] = [];
  loadingRepos = true;

  skills = {
    languages: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'],
    ai: ['Machine Learning', 'Deep Learning', 'Modeling', 'Pytorch'],
    tools: ['Git', 'GitHub', 'VS Code', 'MySQL']
  };

  proficiency = [
    { name: 'Python', icon: 'fab fa-python', level: 85 },
    { name: 'C++', icon: 'fab fa-cuttlefish', level: 75 },
    { name: 'Machine Learning', icon: 'fas fa-brain', level: 80 },
    { name: 'Deep Learning', icon: 'fas fa-network-wired', level: 70 },
    { name: 'Java', icon: 'fas fa-database', level: 60 }
  ];

  constructor(
    private sheets: SheetsService,
    private github: GithubService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.show();

    forkJoin({
      settings: this.sheets.getSettings(),
      featured: this.sheets.getFeatured(),
      experience: this.sheets.getExperience(),
      mainProjects: this.sheets.getMainProjects(),
      repos: this.github.getRepos()
    })
    .pipe(
      timeout(8000),
      catchError(() => of({ settings: {} as Record<string, string>, featured: null, experience: [], mainProjects: [], repos: [] })),
      finalize(() => {
        this.loadingService.hide();
      })
    )
    .subscribe({
      next: ({ settings, featured, experience, mainProjects, repos }) => {
        const s = settings as Record<string, string>;
        if (s['profile_img']) this.profileImg = s['profile_img'];
        if (s['hero_name']) this.heroName = s['hero_name'];
        if (s['hero_desc']) this.heroDesc = s['hero_desc'];
        this.featured = featured;
        this.experience = experience;
        this.mainProjects = mainProjects;
        this.githubRepos = repos;
        this.loadingRepos = false;
      },
      error: (err) => {
        console.error('API Error on Home Page:', err);
        this.loadingRepos = false;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.observeCards(), 500);
  }

  getIcon(lang: string): string { return this.github.getIcon(lang); }

  isKaggle(url: string): boolean { return url?.includes('kaggle'); }

  formatDate(d: string): string {
    if (!d) return '';
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  private observeCards() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.intro-card, .project-card, .interest-card, .table-row-animate').forEach(el => observer.observe(el));
  }
}
