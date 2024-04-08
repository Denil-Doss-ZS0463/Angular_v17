import { Routes } from '@angular/router';
import { HomeComponent } from './core-components/home/home.component';
import { ReportsComponent } from './core-components/reports/reports.component';
import { PageUnderDevComponent } from './basic-components/page-under-dev/page-under-dev.component';
import { PageNotFoundComponent } from './basic-components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
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
        path: '**',
        component: PageNotFoundComponent
    }
];
