import { Component } from '@angular/core';
import { CommonBreadcrumbsComponent } from '../../../common-libraies/common-breadcrumbs/common-breadcrumbs.component';
import { CommonTableComponent } from '../../../common-libraies/common-table/common-table.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonBreadcrumbsComponent, CommonTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  mockData: any[] = [];
  userOptions={
    title:"User Management",
    currentTitle:"Add User",
    hideIcons:false
  }
  userHeaderList: any[] = [];

  constructor(private userService:UserService) {}
  ngOnInit(){
    this.getUsersTableHeaderList();
    this.getUsers();
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
    this.userService.getUsersList().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.mockData = res;
      },
      error:(err:any)=>{
        console.log(err);
      }
    }
    )
  }
}
