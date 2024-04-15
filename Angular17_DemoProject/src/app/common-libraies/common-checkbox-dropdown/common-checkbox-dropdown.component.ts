import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  constructor() { }
  ngAfterViewInit() {
    document.body.addEventListener('click', this.onClickOutside.bind(this));
  }

  ngOnInit() {
  }

  ifChecked(id: any) {
    this.selectedItems.includes(id);
  }

  toggleSelection(id: any, checkedIndex: number) {
    const index = this.selectedItems.indexOf(id);
    this.checkedIndex = checkedIndex;
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(id);
    }
    this.itemsSelected.emit(this.selectedItems);
  }

  toggleDropdDown() {
    this.showDropdown = !this.showDropdown;
  }

  isSelected(id: number): boolean {
    const checkedIds = this.selectedItems.includes(id);
    this.itemsSelected.emit(this.selectedItems);
    return checkedIds;
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
