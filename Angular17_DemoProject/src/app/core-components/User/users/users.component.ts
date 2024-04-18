import { Component, EventEmitter, Output, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChild(CommonBreadcrumbsComponent) commonBreadcrumbsComponent!: CommonBreadcrumbsComponent;

  private refreshSubscription: Subscription;
  mockData: any[] = [];
  userOptions = {
    title: "User Management",
    currentTitle: "Add User",
    hideAddOptionIcons: false,
    enableEditOptions: false
  }
  userHeaderList: any[] = [];
  spinnerLoading: boolean = false;
  appliedFilters: any[] = [];
  userDetails: any[] = [];
  ifFilterModalClosed: boolean = false;
  userId:any;
  accessLevelLists:any[]=[];
 
  constructor(private route: ActivatedRoute, private modalService: NgbModal, private userService: UserService) {
    this.userId = this.userService.getUserIdFromToken();
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
      this.filterUserDetails();
    }
  }
  closeFilterModal(modal: any) {
    modal.dismiss('Cross click');
    if (this.commonBreadcrumbsComponent.chips.length == 1 || this.commonBreadcrumbsComponent.chips.length == 0) {
      this.commonBreadcrumbsComponent.openFilterChips = false;
      this.commonBreadcrumbsComponent.closeChip.emit(true);
    }
    if (modal) {
      this.ifFilterModalClosed = true;
    }
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

  getUsers() {
    this.spinnerLoading = true;
    this.userService.getUsersList().subscribe({
      next: (res: any) => {
        this.userDetails = res;
        this.mockData = res;
        this.getAccessLevelDetails();
        this.filterUserDetails();
        console.log(this.mockData, "user details");
        this.spinnerLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.spinnerLoading = false;
      }
    });
  }

  getAccessLevelDetails() {
    this.userService.getAccessLevelDetails().subscribe({
      next: (res: any) => {
        this.accessLevelLists = res;
        this.replaceAccessLevels();
        this.spinnerLoading=false;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  replaceAccessLevels() {
    this.userDetails.forEach(user => {
      const accessLevel = this.accessLevelLists.find(level => level.id === user.accesslevel);
      if (accessLevel) {
        user.accesslevel = accessLevel.value;
      }
    });
  }

 filterUserDetails() {
    this.mockData = this.userDetails.filter(data => data.id !== this.userId);
 }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }
}
