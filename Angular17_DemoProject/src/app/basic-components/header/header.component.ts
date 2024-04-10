import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from '../../core-components/profile/profile.component';
import { UserService } from '../../services/user.service';

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
  loggedInUser: any;
  userFirstInitial: string | undefined;
  userLastInitial: string | undefined;

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

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {
    this.setUserInitials();
  }

  setUserInitials() {
    const user = this.userService.loggedInUser;
    if (user) {
      this.userFirstInitial = user.firstname.charAt(0);
      this.userLastInitial = user.lastname.charAt(0);
    }
  }

  openProfileModal() {
    this.modalService.open(ProfileComponent, {
      windowClass: 'profile-modal',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }
}
