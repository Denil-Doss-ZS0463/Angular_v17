import { Component } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle,NgIf,RouterOutlet,RouterLink,RouterLinkActive,NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropdownItems: string[] = ["Zuciball", "AGS Navalur", "Area","Sportball", "AGS Navalur", "Area","Sportball", "AGS Navalur", "Area","Sportball", "AGS Navalur", "Area","Sportball", "AGS Navalur", "Area","Sportball", "AGS Navalur", "Area",];
  isCollapsed: boolean = false;
  sidebarHovered:boolean=false;
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
