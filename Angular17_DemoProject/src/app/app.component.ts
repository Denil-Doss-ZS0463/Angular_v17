import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SampleRenderingPageComponent } from './core-components/sample-rendering-page/sample-rendering-page.component';
import { HeaderComponent } from './basic-components/header/header.component';
import { NgIf } from '@angular/common';
import { LoginComponent } from './basic-components/login/login.component';
import { routes as appRoutes, routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SampleRenderingPageComponent,
    HeaderComponent,
    LoginComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ZuciBall Central';
  hideNav = false;

  constructor(private router: Router) { }
  ngOnInit() {
    const includePaths = appRoutes.map(route => route.path);
    console.log(includePaths,'appRoutes');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const endpoint = this.getEndpointFromUrl(event.urlAfterRedirects);
        const firstTwoSegments = endpoint.split('/').slice(0, 2).join('/');
        if (endpoint === 'login') {
          this.hideNav = false;
          return;
        }
        this.hideNav = this.isRouteDefined(firstTwoSegments);
      }
    });
  }
  private getEndpointFromUrl(url: string): string {
    const segments = url.split('/');
    return segments.slice(1).join('/');
  }

  private isRouteDefined(endpoint: string): boolean {
    const includePaths = routes.map(route => route.path);
    return includePaths.includes(endpoint);
  }
}
