import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../loading.services';

const FORM_ENDPOINT = 'https://formspree.io/f/xeobvplw';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formData = { name: '', email: '', subject: '', message: '' };
  status = '';
  statusColor = '';
  sending = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.hide();
  }

  async submit() {
    this.sending = true;
    this.status = 'Sending...';
    this.statusColor = 'var(--primary)';
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...this.formData, _replyto: this.formData.email })
      });
      if (res.ok) {
        this.status = '✅ Message sent successfully! I\'ll be in touch soon.';
        this.statusColor = 'green';
        this.formData = { name: '', email: '', subject: '', message: '' };
      } else {
        this.status = '❌ Submission failed. Please try again.';
        this.statusColor = 'red';
      }
    } catch {
      this.status = '❌ An unexpected error occurred.';
      this.statusColor = 'red';
    } finally {
      this.sending = false;
      setTimeout(() => this.status = '', 5000);
    }
  }
}
