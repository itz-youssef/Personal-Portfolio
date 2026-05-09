import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
