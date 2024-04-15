import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonInputBoxComponent } from '../../common-libraies/common-input-box/common-input-box.component';
import { CommonLogicsService } from '../../services/common-logics.service';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonInputBoxComponent, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  myForm!: FormGroup;
  user: any;
  isEditMode: boolean = false;
  userInitials: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private logicService: CommonLogicsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailid: ['', Validators.required],
    });

    this.fetchUserData();
  }

  fetchUserData() {
    this.user = this.userService.getLoggedInUser();
    this.myForm.patchValue({
      firstName: this.user.firstname,
      lastName: this.user.lastname,
      phoneNumber: this.user.phonenumber,
      emailid: this.user.emailid,
    });
    this.myForm.disable();
    this.userInitials = this.logicService.setUserInitials();
  }
  enableEditMode() {
    this.isEditMode = true;
    this.myForm.enable();
    this.toastService.warning('Edit mode Enabled!');
  }

  invalidForm!: boolean | null;
  saveUserData() {
    if (this.myForm.valid) {
      // Call service to save user details
      // Example: this.userService.saveUserData(this.myForm.value);
      this.isEditMode = false;
      this.invalidForm = false;
      this.toastService.success('Profile Saved !');
      this.myForm.disable();
    } else {
      this.toastService.error('Invalid Form');
      this.invalidForm = true;
    }
  }

  //To Close currently activeModal
  closeModal() {
    this.activeModal.dismiss('Cross click');
  }
}
