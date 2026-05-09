import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SheetsService } from '../sheets.service';
import { LoadingService } from '../loading.services';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  visionText = '';
  missionText = '';
  profileImg = '';

  education = [
    { id: 'cairo-uni', title: 'Cairo University', desc: 'Bachelor of Computer Science', date: '2023 - 2027' },
    { id: 'Coursera', title: 'Coursera Courses', desc: 'AI Development - Deep learning - Artificial neural networks', date: 'Issued 2025' },
    { id: 'ai', title: 'Udemy Courses', desc: 'AI Development - Machine learning - Programming Languages', date: 'Issued 2025' },
    { id: 'nvidia', title: 'NVIDIA Courses', desc: 'AI Development - Deep learning', date: 'Issued 2025' },
    { id: 'datacamp', title: 'DataCamp', desc: 'Programming languages - Github', date: 'Issued 2025' },
    { id: 'ITI', title: 'Mahara tech ITI', desc: 'Programming languages - basics', date: 'Issued 2025' }
  ];

  interests = [
    { icon: 'fas fa-laptop-code', title: 'Software Development', desc: 'Building applications with clean, efficient code and user-friendly interfaces.' },
    { icon: 'fas fa-brain', title: 'Artificial Intelligence', desc: 'Exploring machine learning algorithms and their practical applications, interested about Neural networks and Deep Learning in General.' },
    { icon: 'fas fa-database', title: 'Marketing', desc: 'I am interested in marketing as a way to understand user needs, position products effectively, and turn technical solutions into real-world value.' },
    { icon: 'fas fa-mobile-alt', title: 'Modeling', desc: 'Modeling is crafting clear and structured representations that simplify complex ideas.' }
  ];

  links = [
    { href: 'https://www.linkedin.com/in/youssef-yasser-0b9097333/', icon: 'fab fa-linkedin', label: 'LinkedIn Profile' },
    { href: 'https://github.com/itz-youssef', icon: 'fab fa-github', label: 'GitHub Profile' },
    { href: 'media/Youssef_CV_Final.pdf', icon: 'fas fa-file-download', label: 'Download CV' },
    { href: 'https://linktr.ee/youssefyasser1', icon: 'fas fa-link', label: 'Linktree' },
    { href: 'mailto:y.yousef312@outlook.com', icon: 'fas fa-envelope', label: 'Email Me' },
    { href: 'https://codeforces.com/profile/Youssef_Yasser_Elsayed', icon: 'fas fa-chart-simple', label: 'Codeforces' }
  ];

  constructor(
    private sheets: SheetsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.show();
    this.sheets.getSettings().subscribe({
      next: data => {
        const s = data as Record<string, string>;
        this.visionText = s['vision_text'] || '';
        this.missionText = s['mission_text'] || '';
        this.profileImg = s['profile_img'] || '';
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.observeCards(), 500);
  }

  private observeCards() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.interest-card').forEach(el => observer.observe(el));
  }
}
