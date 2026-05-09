import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetsService } from '../sheets.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {
  allCerts: any[] = [];
  displayed: any[] = [];
  activeFilter = 'all';
  activeSort = '';
  modalImage = '';
  modalOpen = false;

  filters = [
    { key: 'all', label: 'All' },
    { key: 'programming', label: 'Programming' },
    { key: 'ai', label: 'AI/ML' },
    { key: 'soft-skills', label: 'Soft Skills' }
  ];

  constructor(private sheets: SheetsService) {}

  ngOnInit() {
    this.sheets.getCertificates().subscribe(certs => {
      this.allCerts = certs;
      this.displayed = [...certs];
    });
  }

  setFilter(key: string) {
    this.activeFilter = key;
    this.applyFilterSort();
  }

  setSort(key: string) {
    this.activeSort = key;
    this.applyFilterSort();
  }

  private applyFilterSort() {
    let result = this.activeFilter === 'all' ? [...this.allCerts]
      : this.allCerts.filter(c => c.category === this.activeFilter);
    if (this.activeSort === 'date') result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (this.activeSort === 'rating') result.sort((a, b) => b.rating - a.rating);
    this.displayed = result;
  }

  getCategoryName(cat: string): string {
    const m: Record<string, string> = { programming: 'Programming', web: 'Web Development', ai: 'AI/ML', 'soft-skills': 'Soft Skills' };
    return m[cat] || cat;
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  openModal(img: string) { this.modalImage = img; this.modalOpen = true; document.body.style.overflow = 'hidden'; }
  closeModal() { this.modalOpen = false; document.body.style.overflow = 'auto'; }
}
