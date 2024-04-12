import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-common-dropdown',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgFor],
  templateUrl: './common-dropdown.component.html',
  styleUrl: './common-dropdown.component.css'
})
export class CommonDropdownComponent {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() parentForm!: FormGroup;
  @Input() idSelector!:string;
  @Input() placeholderText:string = "Choose Here";
  @Input() errorMessage!: string;
  @Input() invalidForm!: boolean | null;
  @Input() dropDownValue:any[] = [];
  @Input() objectKeyToShow:string = "";
  @Input() objectKeyAsValue:any;
  @Input() selectedValue:string = "";

  showErrors(): boolean | null {
    const control = this.parentForm.get(this.controlName);
    return control && control.invalid && control.touched;
  }

  getObjectKeys(user: any): string[] {
    return Object.keys(user);
  }
}
