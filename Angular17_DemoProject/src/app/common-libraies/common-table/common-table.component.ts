import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-common-table',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass,],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.css'
})
export class CommonTableComponent {

  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() dataToRemove: any[] = [];
  @Input() mockData: any[] = [];
  @Input() componentName: string = '';

  ascendingClicked: boolean = false;
  descendingClicked: boolean = false;
  loading: boolean = false;
  errorLoading: boolean = false;
  sortByColumn: number = 0;
  pageItems: number[] = [50, 100, 150, 200, 250];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;


  constructor(private router: Router) {
  }
  ngOnInit() {
    this.mockData = this.data;
    this.calculateTotalPages();
  }

  getUserKeys(key: any): string[] {
    return Object.keys(key);
  }

  sortByColumnAscending(columnIndex: number) {
    this.ascendingClicked = true;
    this.descendingClicked = false;
    this.sortByColumn = columnIndex;
    const columnKey = this.getColumnKey(columnIndex);
    this.data.sort((a, b) => {
      if (a[columnKey] < b[columnKey]) return -1;
      if (a[columnKey] > b[columnKey]) return 1;
      return 0;
    });
  }

  getColumnKey(columnIndex: number): string {
    const matchedHeader = this.toCamelCase(this.headers[columnIndex].replace(' ', ''));
    return matchedHeader
  }

  sortByColumnDescending(columnIndex: number) {
    this.descendingClicked = true;
    this.ascendingClicked = false;
    this.sortByColumn = columnIndex;
    const columnKey = this.getColumnKey(columnIndex);
    this.data.sort((a, b) => {
      if (a[columnKey] < b[columnKey]) return 1;
      if (a[columnKey] > b[columnKey]) return -1;
      return 0;
    });
  }

  toCamelCase(text: string) {
    return text.replace(/[_\-\s]([a-z])/ig, function (match, letter) {
      return letter.toUpperCase();
    }).replace(/^[A-Z]/, function (match) {
      return match.toLowerCase();
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.mockData.length / this.itemsPerPage);
  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.mockData.length);
    return this.mockData.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onItemsPerPageChange(itemsPerPage: any) {
    this.itemsPerPage = itemsPerPage?.target?.value;
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  availablePages(totalPages: any) {
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  sendRowDetails(data: any) {
    switch (this.componentName) {
      case "users":
        {
          this.router.navigate(['/users', data]);
        } break;

      case "area":
        {
          this.router.navigate(['/area', data]);
        } break;

      case "reports":
        {
          this.router.navigate(['/reports', data]);
        }
    }

  }


}
