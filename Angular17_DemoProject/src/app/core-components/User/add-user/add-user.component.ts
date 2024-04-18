import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInputBoxComponent } from '../../../common-libraies/common-input-box/common-input-box.component';
import { CommonDropdownComponent } from '../../../common-libraies/common-dropdown/common-dropdown.component';
import { CommonBreadcrumbsComponent } from '../../../common-libraies/common-breadcrumbs/common-breadcrumbs.component';
import { CommonCheckboxDropdownComponent } from '../../../common-libraies/common-checkbox-dropdown/common-checkbox-dropdown.component';
import { UserService } from '../../../services/user.service';
import { SpinnerLoadingComponent } from '../../../basic-components/spinner-loading/spinner-loading.component';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonInputBoxComponent, ReactiveFormsModule, CommonDropdownComponent, CommonBreadcrumbsComponent, CommonCheckboxDropdownComponent, SpinnerLoadingComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  myForm!: FormGroup;
  invalidForm!: boolean | null;
  userOptions = {
    title: "User Management > Add User",
    currentTitle: "Add User",
    hideAddOptionIcons: true,
    enableEditOptions: false
  }
  spinnerLoading: boolean = false;
  accessLevelLists: any[] = [];
  userStatus: string = '';
  userId: number = 0;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toastrService: ToastService, private route: ActivatedRoute) {
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      jobtitle: ['', Validators.required],
      accesslevel: ['', Validators.required],
      selectedItems: [this.fb.array([], Validators.required)],
    });
  }

  ngOnInit() {
    this.getAccessLevelDetails();
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      console.log(this.userId, "user id");
      if(this.userId)
        this.getUserDetailsById(this.userId);
    });
  }

  getAccessLevelDetails() {
    this.userService.getAccessLevelDetails().subscribe({
      next: (res: any) => {
        this.accessLevelLists = res;
        console.log(this.accessLevelLists);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    console.log(this.accessLevelLists)
  }

  getInputFormValues() {
    console.log(this.myForm.value);
    
    const addUserJson = {
      firstname: this.myForm.get('firstname')?.value,
      lastname: this.myForm.get('lastname')?.value,
      email: this.myForm.get('email')?.value,
      password: this.myForm.get('password')?.value,
      phonenumber: null,
      jobtitle: this.myForm.get('jobtitle')?.value,
      accesslevel: +this.myForm.get('accesslevel')?.value,
      areaaccess: null
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
  getUserDetailsById(userId: number) {
    this.spinnerLoading = true;
    this.userService.getUserDetailsById(userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.prepopulateUserDetails(res);
        this.userOptions.title = "User Management > " +res.email;
        this.userOptions.enableEditOptions = true;
        this.spinnerLoading = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  prepopulateUserDetails(response: any) {
    this.myForm.disable();
    this.myForm.patchValue({
      firstname: response.firstname,
      lastname: response.lastname,
      email: response.email,
      password: response.password,
      phonenumber: response.phonenumber,
      jobtitle: response.jobtitle,
      accesslevel: response.accesslevel,
      areaaccess: response.areaaccess
    });
    this.userStatus = response.status;
  }
  enableForm(){
    this.myForm.enable();
    this.myForm.get('email')?.disable();
    this.myForm.get('password')?.disable();
  }
  updateUser(userStatus:any){
    const updateUserJson = {
      firstname: this.myForm.get('firstname')?.value,
      lastname: this.myForm.get('lastname')?.value,
      phonenumber: null,
      jobtitle: this.myForm.get('jobtitle')?.value,
      accesslevel: +this.myForm.get('accesslevel')?.value,
      areaaccess: null,
      status: userStatus
    }
    console.log(updateUserJson);
    if (this.myForm.valid) {
      this.spinnerLoading = true;
      this.userService.updateUser(this.userId,updateUserJson).subscribe({
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
  deleteUser(){
    this.spinnerLoading=true;
    this.userService.deleteUser(this.userId).subscribe({
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
}
