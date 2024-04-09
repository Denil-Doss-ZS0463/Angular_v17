import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonInputBoxComponent } from '../../common-libraies/common-input-box/common-input-box.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonInputBoxComponent, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  myForm!: FormGroup;
  firstName: string = '';
  lastName: string = '';
  phoneNumber: number = 0;
  emailid: string = '';

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailid: ['', Validators.required],
    });
  }

  invalidForm!: boolean | null;

  getData() {
    this.firstName = this.myForm.get('firstName')?.value;
    this.lastName = this.myForm.get('lastName')?.value;
    this.phoneNumber = this.myForm.get('phoneNumber')?.value;
    this.emailid = this.myForm.get('emailid')?.value;

    if (this.myForm.valid) {
      // console.log(this.myForm.value);
      this.invalidForm = false;
      this.modalService.dismissAll();
      console.log(
        this.firstName,
        this.lastName,
        this.phoneNumber,
        this.emailid
      );
    } else {
      alert('Invalid Form');
      this.invalidForm = true;
    }
  }

  //To Close currently activeModal
  closeModal() {
    this.activeModal.dismiss('Cross click');
  }
}
