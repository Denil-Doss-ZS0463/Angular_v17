import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StringContants } from '../../../assets/Constants/stringConstant';
import { CommonDropdownComponent } from '../common-dropdown/common-dropdown.component';
import { CommonInputBoxComponent } from '../common-input-box/common-input-box.component';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-common-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonDropdownComponent, CommonInputBoxComponent,NgClass],
  templateUrl: './common-filter.component.html',
  styleUrl: './common-filter.component.css'
})
export class CommonFilterComponent {

  @Input() headers!: string[];
  filterAttributes: string[] = StringContants.filter.filterAttributes;
  @Output() filtersChanged = new EventEmitter<any[]>();
  @Input() tableData: any[] = [];
  @Input() dataAsSelected!: string;
  @Output() resetFilter = new EventEmitter<any>();
  dataToFilter: any[] = [];
  filterForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      filterColumn: ['', Validators.required],
      filterValue: ['', Validators.required],
      filterCondition: ['Attributes', Validators.required]
    });

  }
  ngOnInit() {
    this.dataToFilter = this.tableData;
  }

  filters: any[] = [{ column: '', condition: 'equals', value: '' }];

  addFilter() {
    this.filters.push({ column: '', condition: 'equals', value: '' });
  }

  removeFilter(index: number) {
    this.filters.splice(index, 1);
  }

  applyFilters() {
    console.log("filter criteria-->", this.filters);
    console.log("table data-->", this.tableData);
    console.log(this.filterForm.value);
    if (!this.filterForm.invalid) {
      this.dataToFilter = this.applyFiltersCriteria(this.tableData, [this.filterForm.value]);
      // console.log(this.dataToFilter);
      this.filtersChanged.emit(this.dataToFilter);
    }

  }

  columnValue!: string;
  applyFiltersCriteria<T>(data: any, filterCriteria: any[]): T[] {
    return data.filter((item: any) => {
      return filterCriteria.every(criteria => {
        const columnName = this.toCamelCase(criteria.filterColumn);
        this.columnValue = item[columnName];
        switch (criteria.filterCondition.toLowerCase()) {
          case 'equals':
            return this.columnValue.toLocaleLowerCase() === criteria.filterValue.toLocaleLowerCase();
          case 'does not equal':
            return this.columnValue.toLocaleLowerCase() !== criteria.filterValue.toLocaleLowerCase();
          case 'begins with':
            return this.columnValue.startsWith(criteria.filterValue.toLocaleLowerCase());
          case 'not begins with':
            return !this.columnValue.startsWith(criteria.filterValue.toLocaleLowerCase());
          case 'ends with':
            return this.columnValue.endsWith(criteria.filterValue.toLocaleLowerCase());
          case 'not ends with':
            return !this.columnValue.endsWith(criteria.filterValue.toLocaleLowerCase());
          case 'contains':
            return this.columnValue.toLocaleLowerCase().includes(criteria.filterValue.toLocaleLowerCase());
          case 'not contains':
            return !this.columnValue.toLocaleLowerCase().includes(criteria.filterValue.toLocaleLowerCase());
          default:
            return true;
        }
      });
    });
  }



  toCamelCase(text: string) {
    return text.replace(/[_\-\s]([a-z])/ig, function (match, letter) {
      return letter.toUpperCase();
    }).replace(/^[A-Z]/, function (match) {
      return match.toLowerCase();
    });
  }

  resetValues() {
    this.resetFilter.emit(true)
  }
}
