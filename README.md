# Youssef Yasser Portfolio — Angular Version

## Project Structure
```
src/app/
  app.component.*       — Root shell (navbar + router-outlet + preloader)
  app.routes.ts         — All page routes
  app.config.ts         — App configuration (HttpClient, hash routing)
  navbar/               — Sticky navigation with theme toggle
  home/                 — Home page (hero, projects, skills, etc.)
  about/                — About page (education, interests)
  certificates/         — Certificates with filter/sort/modal
  contact/              — Contact form (Formspree)
  preloader/            — Loading screen
  sheets.service.ts     — Google Sheets CMS integration
  github.service.ts     — GitHub API integration
  theme.service.ts      — Dark/light theme + particles.js
src/styles.css          — All global CSS
```

## How to Run Locally
```bash
npm install
ng serve
```
Open http://localhost:4200

## How to Deploy
```bash
ng build --configuration=production
# Push dist/portfolio/browser/ to your hosting
```

## Notes
- Uses **hash routing** (`/#/about`) for GitHub Pages compatibility
- Media files (images, CV, favicon) must be placed in `src/public/media/`
- Angular.json is configured to copy `src/public/` to the build output root
- Chatbase widget and particles.js are loaded from CDN in index.html
