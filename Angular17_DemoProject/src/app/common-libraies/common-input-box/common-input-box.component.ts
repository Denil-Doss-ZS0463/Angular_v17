import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';

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

  showErrors(): boolean | null {
    const control = this.parentForm.get(this.controlName);
    return control && control.invalid && control.touched || this.invalidForm;
  }
}
