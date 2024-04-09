import { Routes } from '@angular/router';
import { HomeComponent } from './core-components/home/home.component';
import { LoginComponent } from './basic-components/login/login.component';
import { ReportsComponent } from './core-components/reports/reports.component';
import { PageNotFoundComponent } from './basic-components/page-not-found/page-not-found.component';
import { SampleRenderingPageComponent } from './core-components/sample-rendering-page/sample-rendering-page.component';
import { UsersComponent } from './core-components/users/users.component';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {

        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {

        path: 'reports',
        component: ReportsComponent
    },
    {
        path: 'sampleRendering',
        component: SampleRenderingPageComponent
    },
    {
        path:'users',
        component:UsersComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];
