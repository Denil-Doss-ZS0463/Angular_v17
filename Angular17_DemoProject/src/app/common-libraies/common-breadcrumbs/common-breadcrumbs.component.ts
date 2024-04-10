import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
declare let bootstrap: any;
@Component({
  selector: 'app-common-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './common-breadcrumbs.component.html',
  styleUrl: './common-breadcrumbs.component.css'
})
export class CommonBreadcrumbsComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.initializeTooltips();
  }

  initializeTooltips(): void {
    const tooltipTriggerList = this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl: any) => {
      this.renderer.listen(tooltipTriggerEl, 'mouseover', () => {
        const tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
        tooltip.show();
      });
    });
  }
}
