import { Component, TemplateRef, ViewChildren } from '@angular/core';
import { CommonBreadcrumbsComponent } from '../../../common-libraies/common-breadcrumbs/common-breadcrumbs.component';
import { CommonTableComponent } from '../../../common-libraies/common-table/common-table.component';
import { ActivatedRoute } from '@angular/router';
import { CommonFilterComponent } from '../../../common-libraies/common-filter/common-filter.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { SpinnerLoadingComponent } from '../../../basic-components/spinner-loading/spinner-loading.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonBreadcrumbsComponent, CommonTableComponent, CommonFilterComponent, SpinnerLoadingComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
 private refreshSubscription: Subscription;
  mockData: any[] = [];
  userOptions = {
    title: "User Management",
    currentTitle: "Add User",
    hideAddOptionIcons: false,
    enableEditOptions: false
  }
  
  userHeaderList: any[] = [];
  spinnerLoading:boolean = false;
  appliedFilters: any[] = [];
  userDetails: any[] = [];
  userId:number=0;
  constructor(private route: ActivatedRoute, private modalService: NgbModal, private userService:UserService) {
    this.userId=this.userService.getUserIdFromToken();
    console.log(this.userId,"USER ID");
    
    this.refreshSubscription = this.userService.refreshUserList$.subscribe(() => {
      this.getUsers();
    });
   }
  ngOnInit() {
    this.getUsersTableHeaderList();
    this.getUsers();
  }

  applyFilters(filteredData: any) {
    this.mockData = filteredData;
  }

  openFilterModal(ifFilterSelected: boolean, filterModal: any) {
    if (ifFilterSelected) {
      this.modalService.open(filterModal, { windowClass: 'filterModalUserScreen', keyboard: false, size: 'lg', scrollable: true, backdrop: 'static' });
    }
  }

  filterApplied(event: any, modal: any) {
    if (event) {
      this.appliedFilters = event;
      modal.close();
    }
  }

  closeChip(chipClosingEvent: any) {
    if (chipClosingEvent) {
      this.mockData = this.userDetails;
    }
  }
  closeFilterModal(modal: any) {
    modal.dismiss('Cross click');
  }
  getUsersTableHeaderList(): Promise<void> {
    return new Promise<void>((resolve) => {
      fetch('./assets/Jsons/tableHeader.json')
        .then(res => res.json())
        .then(data => {
          this.userHeaderList = data.user;
          resolve();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    });
  }
  getUsers(){
    this.spinnerLoading=true;
    console.log(this.userId,"USER ID");
    
    this.userService.getUsersList().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.userDetails = res;
        this.mockData = res;
        this.mockData=this.userDetails.filter(data=>data.id!==this.userId);
        console.log(this.mockData,"user details");
        
        this.spinnerLoading=false;
      },
      error:(err:any)=>{
        console.log(err);
        this.spinnerLoading=false;
      }
    });
  }
  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }
}
