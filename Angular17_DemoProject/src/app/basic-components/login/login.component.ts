import { Component } from '@angular/core';
import { CommonInputBoxComponent } from '../../common-libraies/common-input-box/common-input-box.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonInputBoxComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myForm!: FormGroup;
  submitted = false;
  userData: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get formControls() { return this.myForm.controls; }
  get email() {
    return this.myForm.get('email');
  }

  login() {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }

    const email = this.myForm.value.email;

    this.userService.login(this.myForm.value).subscribe(
      response => {
        console.log(response);
        this.userData = response;
        this.router.navigate(['/home']);
      },
      error => {
        console.error(error);
        if (error.status === 404) {
          this.myForm.get('email')?.setErrors({ userNotFound: true });
        }
      }
    );
  }
}
