import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
declare let bootstrap: any;
@Component({
  selector: 'app-common-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './common-breadcrumbs.component.html',
  styleUrl: './common-breadcrumbs.component.css'
})
export class CommonBreadcrumbsComponent {

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  tooltip:any;
  @Input() user:any='';
  hideIcons: boolean = false;
  customRoutes = ['/users', '/users/new-user']; 
  addUser:string="";
  constructor(private renderer: Renderer2, private elementRef: ElementRef,private router:Router) { }

  ngAfterViewInit(): void {
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
  openFunctionaity(){
    this.hideIcons = true;
    this.tooltip.hide();
    if(this.user.currentTitle=="Add User"){
      this.router.navigate(['users/new-user']);
    }
  }
  saveFunctionality(){
    this.save.emit();
  }
  closeOption(){
    this.router.navigate(['users']);
  }
}
