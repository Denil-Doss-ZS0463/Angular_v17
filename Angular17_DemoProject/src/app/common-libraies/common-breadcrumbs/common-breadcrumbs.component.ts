import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
declare let bootstrap: any;
@Component({
  selector: 'app-common-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './common-breadcrumbs.component.html',
  styleUrl: './common-breadcrumbs.component.css'
})
export class CommonBreadcrumbsComponent {

  tooltip:any;
  @Input() user:string='';
  constructor(private renderer: Renderer2, private elementRef: ElementRef,private router:Router) { }

  ngOnInit(): void {
    this.initializeTooltips();
  }

  initializeTooltips(): void {
    const tooltipTriggerList = this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl: any) => {
      this.renderer.listen(tooltipTriggerEl, 'mouseover', () => {
        this.tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
        this.tooltip.show();
      });
    });
  }
  addUser(){
    this.tooltip.hide();
    this.router.navigate(['users/new-user']);
  }
}
