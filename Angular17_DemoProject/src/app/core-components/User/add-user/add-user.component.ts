import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInputBoxComponent } from '../../../common-libraies/common-input-box/common-input-box.component';
import { CommonDropdownComponent } from '../../../common-libraies/common-dropdown/common-dropdown.component';
import { CommonBreadcrumbsComponent } from '../../../common-libraies/common-breadcrumbs/common-breadcrumbs.component';
import { CommonCheckboxDropdownComponent } from '../../../common-libraies/common-checkbox-dropdown/common-checkbox-dropdown.component';
import { UserService } from '../../../services/user.service';
import { SpinnerLoadingComponent } from '../../../basic-components/spinner-loading/spinner-loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonInputBoxComponent, ReactiveFormsModule, CommonDropdownComponent,CommonBreadcrumbsComponent,CommonCheckboxDropdownComponent,SpinnerLoadingComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  [x: string]: any;
  myForm!: FormGroup;
  invalidForm!: boolean | null;
  users: any[] = [
    "1","2","3","4"
  ]
  userOptions={
    title:"User Management > Add User",
    currentTitle:"Add User",
    hideIcons:true
  }
  spinnerLoading:boolean = false;
  constructor(private fb: FormBuilder, private userService:UserService, private router:Router) {
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailid: ['', Validators.required],
      password: ['', Validators.required],
      jobtitle: ['', Validators.required],
      accesslevel: ['', Validators.required],
    });
  }

  getInputFormValues(){
    this.spinnerLoading = true;
    console.log(this.myForm.value);
    const formDataWithAdditionalValue = {
      ...this.myForm.value,
      phonenumber:9734325235,
      areaaccess: 'Full access',
      status:"active"
    };
    console.log(formDataWithAdditionalValue);
    this.userService.addUser(formDataWithAdditionalValue).subscribe({
      next: (res:any) => {
        console.log(res);
        this.spinnerLoading = false;
        this.myForm.disable();
        this.router.navigate(['/users']);
        this.myForm.reset();
      },
      error: (err:any) => {
        console.log(err);
        this.spinnerLoading = false;
      }
    })
  }
}