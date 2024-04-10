import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from '../../core-components/profile/profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass,
    ProfileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  profileModal: any;

  dropdownItems: string[] = [
    'ZuciBall',
    'AGS Navalur',
    'Area',
    'Sportball',
    'AGS Navalur',
    'Area',
    'Sportball',
    'AGS Navalur',
    'Area',
    'Sportball',
    'AGS Navalur',
    'Area',
    'Sportball',
    'AGS Navalur',
    'Area',
    'Sportball',
    'AGS Navalur',
    'Area',
  ];
  isCollapsed: boolean = false;
  sidebarHovered: boolean = false;
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private modalService: NgbModal,private router:Router) {}

  openProfileModal() {
    this.modalService.open(ProfileComponent, {
      windowClass: 'profile-modal',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }
  userLogout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
