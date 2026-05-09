import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SheetsService } from '../sheets.service';
import { GithubService } from '../github.service';
import { forkJoin } from 'rxjs';

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

  constructor(private sheets: SheetsService, private github: GithubService) {}

  ngOnInit() {
    forkJoin({
      settings: this.sheets.getSettings(),
      featured: this.sheets.getFeatured(),
      experience: this.sheets.getExperience(),
      mainProjects: this.sheets.getMainProjects()
    }).subscribe(({ settings, featured, experience, mainProjects }) => {
      if (settings['profile_img']) this.profileImg = settings['profile_img'];
      if (settings['hero_name']) this.heroName = settings['hero_name'];
      if (settings['hero_desc']) this.heroDesc = settings['hero_desc'];
      this.featured = featured;
      this.experience = experience;
      this.mainProjects = mainProjects;
    });

    this.github.getRepos().subscribe(repos => {
      this.githubRepos = repos;
      this.loadingRepos = false;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.observeCards(), 500);
  }

  getIcon(lang: string): string { return this.github.getIcon(lang); }

  isKaggle(url: string): boolean { return url?.includes('kaggle'); }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  private observeCards() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.intro-card, .project-card, .interest-card, .table-row-animate').forEach(el => observer.observe(el));
  }
}
