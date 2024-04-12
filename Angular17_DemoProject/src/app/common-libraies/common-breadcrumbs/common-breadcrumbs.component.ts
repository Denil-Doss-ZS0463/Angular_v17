import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
declare let bootstrap: any;
@Component({
  selector: 'app-common-breadcrumbs',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './common-breadcrumbs.component.html',
  styleUrl: './common-breadcrumbs.component.css'
})
export class CommonBreadcrumbsComponent {

  tooltip:any;
  @Input() user:any='';
  hideIcons: boolean = false;
  constructor(private renderer: Renderer2, private elementRef: ElementRef,private router:Router) { }

  ngAfterViewInit(): void {
    this.initializeTooltips();
    console.log(this.user,"user");
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
    this.hideIcons = true;
    this.tooltip.hide();
    this.router.navigate(['users/new-user']);
  }
  closeOption(){
    this.router.navigate(['users']);
  }
}
