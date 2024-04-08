import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StringContants } from '../../../assets/Constants/stringConstant';
import { CommonDropdownComponent } from '../common-dropdown/common-dropdown.component';
import { CommonInputBoxComponent } from '../common-input-box/common-input-box.component';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-common-filter',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonDropdownComponent, CommonInputBoxComponent, NgClass],
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
  columnValue!: string;

  applyLabel:string = StringContants.generalContants.apply;
  addFilterLabel:string = StringContants.filter.addFilterLabel;
  andLabel:string = StringContants.filter.andLabel;

  filters: any[] = [{ column: '', condition: '', value: '' }];

  ngOnInit() {
    this.dataToFilter = this.tableData;
    this.filters = [{ column: this.headers[0], condition: 'Equals', value: '' }];
  }

  addFilter() {
    if (this.headers.length) {
      this.filters.push({ column: this.headers[this.filters.length], condition: 'Equals', value: '' });
    }
  }

  removeFilter(index: number) {
    this.filters.splice(index, 1);
  }

  applyFilters() {
    if (this.filters.length > 0) {
      this.dataToFilter = this.applyFiltersCriteria(this.tableData, this.filters) ? this.applyFiltersCriteria(this.tableData, this.filters) : [];
      console.log(this.dataToFilter);
      this.filtersChanged.emit(this.dataToFilter);
    }

  }

  applyFiltersCriteria<T>(data: any, filterCriteria: any[]): T[] {
    return data.filter((item: any) => {
      return filterCriteria.every(criteria => {
        const columnName = this.toCamelCase(criteria.column);
        this.columnValue = item[columnName];
        switch (criteria.condition.toLowerCase()) {
          case 'equals':
            return this.columnValue.toLocaleLowerCase() === criteria.value.toLocaleLowerCase();
          case 'does not equal':
            return this.columnValue.toLocaleLowerCase() !== criteria.value.toLocaleLowerCase();
          case 'begins with':
            return this.columnValue.startsWith(criteria.value.toLocaleLowerCase());
          case 'not begins with':
            return !this.columnValue.startsWith(criteria.value.toLocaleLowerCase());
          case 'ends with':
            return this.columnValue.endsWith(criteria.value.toLocaleLowerCase());
          case 'not ends with':
            return !this.columnValue.endsWith(criteria.value.toLocaleLowerCase());
          case 'contains':
            return this.columnValue.toLocaleLowerCase().includes(criteria.value.toLocaleLowerCase());
          case 'not contains':
            return !this.columnValue.toLocaleLowerCase().includes(criteria.value.toLocaleLowerCase());
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
