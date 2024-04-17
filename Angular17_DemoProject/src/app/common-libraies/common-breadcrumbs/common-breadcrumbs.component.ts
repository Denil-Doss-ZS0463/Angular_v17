import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonChipComponent } from '../common-chip/common-chip.component';
import { FormsModule } from '@angular/forms';
declare let bootstrap: any;
@Component({
  selector: 'app-common-breadcrumbs',
  standalone: true,
  imports: [RouterLink, CommonChipComponent, FormsModule],
  templateUrl: './common-breadcrumbs.component.html',
  styleUrl: './common-breadcrumbs.component.css'
})
export class CommonBreadcrumbsComponent {

  @Output() ifFilterSelected = new EventEmitter<any>();
  @Input() user: any = '';
  @Input() chips: string[] = [];
  @Input() filters: string[] = ['Filter 1', 'Filter 2', 'Filter 3'];
  @Output() closeChip = new EventEmitter<any>();
  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Input() openFilterChips: boolean = false;
  @Input() ifFilterModalClosed: boolean = false;
  tooltip: any;
  hideIcons: boolean = false;
  customRoutes = ['/users', '/users/new-user'];
  addUser: string = "";
  newFilter: string = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private router: Router) {}

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
  openFunctionaity() {
    this.hideIcons = true;
    this.tooltip.hide();
    if (this.user.currentTitle == "Add User") {
      this.router.navigate(['users/new-user']);
    }
  }
  saveFunctionality() {
    this.save.emit();
  }
  closeOption() {
    this.router.navigate(['users']);
  }

  openFilterModal() {
    this.ifFilterSelected.emit(true);
    this.openFilterChips = true;
  }

  closeChips() {
    this.closeChip.emit(true);
    this.openFilterChips = false;
  }


  selectFilter(filter: any) {
    if (!this.chips.includes(filter.target.value)) {
      this.chips.push(filter.target.value);
    }
  }

  removeChip(chip: string) {
    const index = this.chips.indexOf(chip);
    if (this.chips.length === 1) {
      this.closeChips();
    }
    else if (index !== -1) {
      this.chips.splice(index, 1);
    } else {
      this.closeChips();
    }
  }


}
