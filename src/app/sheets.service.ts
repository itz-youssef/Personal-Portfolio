import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const SHEET_ID = '1qUjr34HZloU2QYjip8yAPwRS6FOAqRp0TPOnKnImKxs';
const API_KEY  = 'AIzaSyDApsCPIpowQgZ1IwHmrk1VOGPRknBtJMg';
const BASE     = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values`;

@Injectable({ providedIn: 'root' })
export class SheetsService {
  constructor(private http: HttpClient) {}

  private get(range: string): Observable<any[][]> {
    return this.http.get<any>(`${BASE}/${range}?key=${API_KEY}`).pipe(
      map(r => r.values || []),
      catchError(() => of([]))
    );
  }

  getSettings(): Observable<Record<string, string>> {
    return this.get('Sheet1!A1:B50').pipe(
      map(rows => Object.fromEntries(rows))
    );
  }

  getCertificates(): Observable<any[]> {
    return this.get('Certificates!A2:G200').pipe(
      map(rows => rows.filter(r => r.length >= 4 && r[0]).map((r, i) => ({
        id: i + 1,
        title: r[0] || '',
        issuer: r[1] || '',
        date: r[2] || '',
        category: r[3] || 'programming',
        description: r[4] || '',
        image: r[5] || '',
        rating: Number(r[6] || 0),
        icon: r[3] === 'ai' ? 'brain' : r[3] === 'soft-skills' ? 'user' : 'code',
        link: '#'
      })))
    );
  }

  getExperience(): Observable<any[]> {
    return this.get('Experience!A2:D20').pipe(
      map(rows => rows.filter(r => r[0]).map(r => ({
        role: r[0] || '', company: r[1] || '', duration: r[2] || '', description: r[3] || ''
      })))
    );
  }

  getFeatured(): Observable<any | null> {
    return this.get('Featured!A2:E2').pipe(
      map(rows => rows.length > 0 && rows[0][0] ? {
        title: rows[0][0] || '', description: rows[0][1] || '',
        image: rows[0][2] || '', link: rows[0][3] || '#', badge: rows[0][4] || 'Offer Letter'
      } : null)
    );
  }

  getMainProjects(): Observable<any[]> {
    return this.get('MainProjects!A2:D20').pipe(
      map(rows => rows.filter(r => r[0]).map(r => ({
        title: r[0] || '', description: r[1] || '', image: r[2] || '', github: r[3] || '#'
      })))
    );
  }
}
