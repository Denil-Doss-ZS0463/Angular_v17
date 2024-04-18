import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-common-checkbox-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './common-checkbox-dropdown.component.html',
  styleUrl: './common-checkbox-dropdown.component.css'
})
export class CommonCheckboxDropdownComponent {

  @ViewChildren('container') containers!: QueryList<ElementRef>;
  @Input() placeholderText = "Select any option";
  @Input() label!: string;
  @Input() idSelector!: string;
  @Input() errorMessage!: string;
  @Input() invalidForm!: boolean | null;
  @Input() objectKeyToShow: string = "";
  @Input() dropdownOptions: any[] = [];
  @Input() selectedItems: any[] = [];
  @Input() required!: boolean;
  @Input() disabled: boolean = false;

  @Output() itemsSelected = new EventEmitter<any>();

  showDropdown: boolean = false;
  checkedIndex: number = 0;

  selectedOptions = new FormControl([]);
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string;
  @Input() selectedItemsFormArray!: FormArray;
  constructor(private fb: FormBuilder) {}
  ngAfterViewInit() {
    document.body.addEventListener('click', this.onClickOutside.bind(this));
  }

  ngOnInit() {
  }

  ifChecked(id: any) {
    this.selectedItems.includes(id);
  }

  toggleSelection(id: any) {
    const index = this.selectedItemsFormArray.controls.findIndex(control => control.value === id);
    if (index > -1) {
      this.selectedItemsFormArray.removeAt(index);
    } else {
      this.selectedItemsFormArray.push(id);
    }
    this.itemsSelected.emit(this.selectedItemsFormArray.value);
  }

  toggleDropdDown() {
    this.showDropdown = !this.showDropdown;
  }

  isSelected(id: number): boolean {
    return this.selectedItemsFormArray.controls.some(control => control.value === id);
  }

  returnLastSelectedValue(id: any) {
    const data = this.dropdownOptions.find(obj => obj.id === id);
    const checkForObject = this.checkForArrayOfObject();
    return checkForObject ? data[this.objectKeyToShow] : this.selectedItems[0];
  }

  onClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    const clickedInsideContainer = this.containers.some(container =>
      container.nativeElement.contains(clickedElement)
    );

    if (!clickedInsideContainer) {
      this.showDropdown = false;
    }
  }

  checkForArrayOfObject() {
    return this.dropdownOptions && this.dropdownOptions.length && this.dropdownOptions[0] && typeof this.dropdownOptions[0] === 'object'
  }

  checkForArrayOfString() {
    return this.dropdownOptions && this.dropdownOptions.length && typeof this.dropdownOptions[0] === 'string'
  }
  
}
