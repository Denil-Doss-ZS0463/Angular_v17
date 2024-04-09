import { Routes } from '@angular/router';
import { HomeComponent } from './core-components/home/home.component';
import { LoginComponent } from './basic-components/login/login.component';
import { ReportsComponent } from './core-components/reports/reports.component';
import { PageUnderDevComponent } from './basic-components/page-under-dev/page-under-dev.component';
import { PageNotFoundComponent } from './basic-components/page-not-found/page-not-found.component';
import { SampleRenderingPageComponent } from './core-components/sample-rendering-page/sample-rendering-page.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'sampleRendering',
    component: SampleRenderingPageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
