import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CommonLogicsService {
  user: any;
  userInitials: any;

  constructor(private userService: UserService) {}

  setUserInitials(): any {
    this.user = this.userService.getLoggedInUser();
    if (this.user) {
      const firstNameInitial = this.user.firstname.charAt(0);
      const lastNameInitial = this.user.lastname.charAt(0);
      this.userInitials = firstNameInitial + lastNameInitial;
      return this.userInitials;
    }
  }
  fetchUserDetails():any {
    const userId = this.userService.getUserIdFromToken();
    if (!userId) {
    console.error('User ID is null or undefined');
    return;
  }
    this.userService.loggedUser(userId).subscribe(
      (userDetails) => {
        this.userService.setLoggedInUser(userDetails);
        this.setUserInitials();
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );

  }
}
