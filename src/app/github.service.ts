import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private http: HttpClient) {}

  getRepos(): Observable<any[]> {
    return this.http.get<any[]>(
      'https://api.github.com/users/itz-youssef/repos?sort=updated&per_page=6'
    ).pipe(
      timeout(5000),           // ← fail fast after 5s
      catchError(() => of([]))  // ← on 403 or timeout, return empty array
    );
  }

  getIcon(lang: string): string {
    const icons: Record<string, string> = {
      JavaScript: 'js', Python: 'python', Java: 'java',
      'C++': 'cuttlefish', HTML: 'html5', CSS: 'css3-alt',
      TypeScript: 'js-square', PHP: 'php'
    };
    return icons[lang] || 'code';
  }
}