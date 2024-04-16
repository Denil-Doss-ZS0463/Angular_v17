import { Routes } from '@angular/router';
import { HomeComponent } from './core-components/home/home.component';
import { LoginComponent } from './basic-components/login/login.component';
import { ReportsComponent } from './core-components/reports/reports.component';
import { PageNotFoundComponent } from './basic-components/page-not-found/page-not-found.component';
import { SampleRenderingPageComponent } from './core-components/sample-rendering-page/sample-rendering-page.component';
import { UsersComponent } from './core-components/User/users/users.component';
import { AddUserComponent } from './core-components/User/add-user/add-user.component';
import { MerchandiseComponent } from './core-components/Merchandise/merchandise/merchandise.component';
import { AddMerchandiseComponent } from './core-components/Merchandise/add-merchandise/add-merchandise.component';
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
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/new-user',
    component: AddUserComponent,
  },
  {
    path: 'users/new-user/:id',
    component: AddUserComponent,
  },
  {
    path: 'merchandise',
    component: MerchandiseComponent,
  },
  {
    path: 'merchandise/new-merchandise',
    component: AddMerchandiseComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];