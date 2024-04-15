import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInputBoxComponent } from '../../../common-libraies/common-input-box/common-input-box.component';
import { CommonDropdownComponent } from '../../../common-libraies/common-dropdown/common-dropdown.component';
import { CommonBreadcrumbsComponent } from '../../../common-libraies/common-breadcrumbs/common-breadcrumbs.component';
import { CommonCheckboxDropdownComponent } from '../../../common-libraies/common-checkbox-dropdown/common-checkbox-dropdown.component';
import { UserService } from '../../../services/user.service';
import { SpinnerLoadingComponent } from '../../../basic-components/spinner-loading/spinner-loading.component';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonInputBoxComponent, ReactiveFormsModule, CommonDropdownComponent, CommonBreadcrumbsComponent, CommonCheckboxDropdownComponent, SpinnerLoadingComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  [x: string]: any;
  myForm!: FormGroup;
  invalidForm!: boolean | null;
  userOptions = {
    title: "User Management > Add User",
    currentTitle: "Add User",
    hideIcons: true
  }
  spinnerLoading: boolean = false;
  accessLevelLists: any[] = [];
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastrService:ToastService) {
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailid: ['', Validators.required],
      password: ['', Validators.required],
      jobtitle: ['', Validators.required],
      accesslevel: ['', Validators.required],
    });
  }

   ngOnInit() { 
    this.getAccessLevelDetails();
   }

   getAccessLevelDetails(){
    this.userService.getAccessLevelDetails().subscribe({
      next: (res: any) => {
        this.accessLevelLists=res;
        console.log(this.accessLevelLists);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    console.log(this.accessLevelLists)
   }

  getInputFormValues() {
    const addUserJson = {
        firstname:this.myForm.get('firstname')?.value,
        lastname:this.myForm.get('lastname')?.value,
        email:this.myForm.get('emailid')?.value,
        password:this.myForm.get('password')?.value,
        phonenumber: null,
        jobtitle:this.myForm.get('jobtitle')?.value,
        accesslevel:+this.myForm.get('accesslevel')?.value,
        areaaccess:null
    }
    console.log(addUserJson);
    if (this.myForm.valid) {
      this.spinnerLoading = true;
      this.userService.addUser(addUserJson).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastrService.success(res.message);
          this.spinnerLoading = false;
          this.myForm.disable();
          this.router.navigate(['/users']);
          this.myForm.reset();
          this.userService.refreshUserList();
        },
        error: (err: any) => {
          console.log(err);
          this.toastrService.error(err.message);
          this.spinnerLoading = false;
        }
      })
    }
    else {
      this.invalidForm = true;
      this.spinnerLoading = false;
    }

  }
}