import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonChipComponent } from '../common-chip/common-chip.component';
import { FormsModule } from '@angular/forms';
import { CommonLogicsService } from '../../services/common-logics.service';
import { SpinnerLoadingComponent } from '../../basic-components/spinner-loading/spinner-loading.component';
declare let bootstrap: any;
@Component({
  selector: 'app-common-breadcrumbs',
  standalone: true,
  imports: [RouterLink, CommonChipComponent, FormsModule,SpinnerLoadingComponent],
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
  @Output() enableForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() update: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() download: EventEmitter<void> = new EventEmitter<void>();
  @Input() openFilterChips: boolean = false;
  @Input() userStatus:string='';
  @Input() userDetails:any;
  spinnerLoading:boolean=false;
  
  tooltip:any;
  @Input() ifFilterModalClosed: boolean = false;
  hideIcons: boolean = false;
  customRoutes = ['/users', '/users/new-user'];
  addUser: string = "";
  newFilter: string = '';
  changeEditOptionToSave: boolean = false;
  
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private router: Router, private commonService:CommonLogicsService) { }

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
  addFunctionality(){
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
  enableEditOption(){
    this.changeEditOptionToSave = true;
    this.enableForm.emit();
  }
  updateFunctionality(){
    this.update.emit(this.userStatus);
  }
  changeUserStatus(){
    if(this.userStatus=="Active"){
      this.userStatus="Inactive";
    }
    else{
      this.userStatus="Active";
    }
  }
  deleteFunctionality(){
    this.delete.emit();
  }
  downloadFunctionality(){
    this.spinnerLoading=true;
    this.commonService.exportAsExcelFile(this.userDetails, 'User');
    this.spinnerLoading=false;
  }
}
