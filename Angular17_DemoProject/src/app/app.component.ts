import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SampleRenderingPageComponent } from './core-components/sample-rendering-page/sample-rendering-page.component';
import { HeaderComponent } from './basic-components/header/header.component';
import { NgIf } from '@angular/common';
import { LoginComponent } from './basic-components/login/login.component';

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
  includePaths: string[] = ['', 'home', 'reports','users','new-user'];
  hideNav = false;

  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const endpoint = this.getEndpointFromUrl(event.urlAfterRedirects);
        this.hideNav = this.includePaths.includes(endpoint);
      }
    });
  }
  private getEndpointFromUrl(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 1];
  }
}
