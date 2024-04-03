import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInputBoxComponent } from '../../common-libraies/common-input-box/common-input-box.component';

@Component({
  selector: 'app-sample-rendering-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonInputBoxComponent],
  templateUrl: './sample-rendering-page.component.html',
  styleUrl: './sample-rendering-page.component.css'
})
export class SampleRenderingPageComponent {

  
  inputValue = signal('')

  myForm!: FormGroup;

  userName: string = "";
  age: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      currency: ['', Validators.required],
      areaName: ['', Validators.required]
    });
  }

  invalidForm!: boolean | null;
  getData() {
    this.userName = this.myForm.get('username')?.value;
    this.age = this.myForm.get('age')?.value;

    if (this.myForm.valid) {
      // console.log(this.myForm.value);
      this.invalidForm = false;

      console.log(this.userName, this.age);

    }
    else {
      alert("Invalid Form");
      this.invalidForm = true;
    }

  }


}
