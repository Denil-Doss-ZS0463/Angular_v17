import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

 
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class CommonLogicsService {
  user: any;
  userInitials: any;

  constructor(private userService: UserService) {}

  setUserInitials(): any {
    this.user = this.userService.getLoggedInUser();
    if (this.user) {
      const firstNameInitial = this.user.firstname.charAt(0);
      const lastNameInitial = this.user.lastname.charAt(0);
      this.userInitials = firstNameInitial + lastNameInitial;
      return this.userInitials;
    }
  }
  
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
 
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  fetchUserDetails():any {
    const userId = this.userService.getUserIdFromToken();
    if (!userId) {
    console.error('User ID is null or undefined');
    return;
  }
    this.userService.loggedUser(userId).subscribe(
      (userDetails) => {
        this.userService.setLoggedInUser(userDetails);
        this.setUserInitials();
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
