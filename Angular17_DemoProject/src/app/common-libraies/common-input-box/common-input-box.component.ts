import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { StringContants } from '../../../assets/Constants/stringConstant';
@Component({
  selector: 'app-common-input-box',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './common-input-box.component.html',
  styleUrl: './common-input-box.component.css',
})
export class CommonInputBoxComponent {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() parentForm!: FormGroup;
  @Input() fieldType!: string;
  @Input() idSelector!: string;
  @Input() placeholderText!: string;
  @Input() errorMessage!: string;
  @Input() invalidForm!: boolean | null;
  @Input() required!: boolean;
  @Input() disabled: boolean = false;

  toggleEye: boolean = false;
  passwordLengthError:string = StringContants.changePassword.passwordLengthErrorText;
  passwordNotMatchError:string = StringContants.changePassword.passwordNotMatchErrorText;
  passwordRegexError:string = StringContants.changePassword.passwordRegexErrorText;
  
  showErrors(): boolean | null {
    const control = this.parentForm.get(this.controlName);
    return control && control.invalid && control.touched || this.invalidForm;
  }

  toggleEyeIcon() {
    this.toggleEye = !this.toggleEye;
    if (this.toggleEye) {
      this.fieldType = 'text';
    } else {
      this.fieldType = 'password';
    }
  }
}
