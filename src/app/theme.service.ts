import { Injectable } from '@angular/core';

declare const particlesJS: any;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private current: string = 'light';

  init() {
    this.current = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', this.current);
    setTimeout(() => this.initParticles(), 300);
  }

  toggle() {
    this.current = this.current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.current);
    localStorage.setItem('theme', this.current);
    this.destroyParticles();
    setTimeout(() => this.initParticles(), 50);
  }

  isDark(): boolean {
    return this.current === 'dark';
  }

  private destroyParticles() {
    if ((window as any).pJSDom?.length > 0) {
      try {
        (window as any).pJSDom[0].pJS.fn.vendors.destroypJS();
        (window as any).pJSDom = [];
      } catch (e) {}
    }
  }

  initParticles() {
    if (typeof particlesJS === 'undefined') {
      setTimeout(() => this.initParticles(), 200);
      return;
    }
    const el = document.getElementById('particles-js');
    if (!el) return;
    const color = this.current === 'dark' ? '#4da8da' : '#ca42f7';
    const line  = this.current === 'dark' ? '#4da8da' : '#ac4ccc';
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: color },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
        size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
        line_linked: { enable: true, distance: 150, color: line, opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, random: true, out_mode: 'out', attract: { enable: true, rotateX: 600, rotateY: 1200 } }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.8 } }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }
}
