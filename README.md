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
src/styles.css          — All global CSS (identical to original)
```

## How to Run Locally
```bash
npm install
ng serve
```
Open http://localhost:4200

## How to Deploy to GitHub Pages
```bash
npm install -g @angular/cli
ng add @angular/fire   # OR use:
ng build --configuration=production
# Then push the dist/portfolio/browser/ folder to your gh-pages branch
```

### Quick GitHub Pages deploy:
```bash
npm install -g angular-cli-ghpages
ng deploy --base-href=/YOUR-REPO-NAME/
```

## Notes
- Uses **hash routing** (`/#/about`) for compatibility with GitHub Pages static hosting
- The `media/` folder (images, CV, favicon) must be placed alongside the built files
- Chatbase widget and particles.js are loaded from CDN in index.html
- All content (hero name, profile pic, certificates, experience) is still driven by Google Sheets
