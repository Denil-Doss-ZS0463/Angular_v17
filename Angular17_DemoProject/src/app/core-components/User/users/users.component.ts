import { Component } from '@angular/core';
import { CommonBreadcrumbsComponent } from '../../../common-libraies/common-breadcrumbs/common-breadcrumbs.component';
import { CommonTableComponent } from '../../../common-libraies/common-table/common-table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonBreadcrumbsComponent, CommonTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  mockData: any[] = [];

  constructor(private route: ActivatedRoute) {}
  ngOnInit(){
    this.mockData = this.employeeDetails;
    this.route.params.subscribe((params) => {
      console.log(params);
    })
  }
  employeeDetails: any[] =
    [
      {
        "id": '1',
        "firstName": "John",
        "lastName": "Doe",
        "age": '35',
        "email": "john.doe@example.com",
        "department": "Engineering",
        "position": "Software Engineer",
        "salary": '75000',
        "joinDate": "2022-01-15"
      },
      {
        "id": '2',
        "firstName": "Jane",
        "lastName": "Smith",
        "age": "",
        "email": "jane.smith@example.com",
        "department": "Marketing",
        "position": "Marketing Manager",
        "salary": "65000",
        "joinDate": "2021-11-20"
      },
      {
        "id": "3",
        "firstName": "Michael",
        "lastName": "Johnson",
        "age": "40",
        "email": "michael.johnson@example.com",
        "department": "Finance",
        "position": "Financial Analyst",
        "salary": "80000",
        "joinDate": "2020-09-10"
      },
      {
        "id": "4",
        "firstName": "Emily",
        "lastName": "Davis",
        "age": "32",
        "email": "emily.davis@example.com",
        "department": "Human Resources",
        "position": "HR Manager",
        "salary": "70000",
        "joinDate": "2023-03-05"
      },
      {
        "id": "5",
        "firstName": "William",
        "lastName": "Wilson",
        "age": "45",
        "email": "william.wilson@example.com",
        "department": "Operations",
        "position": "Operations Director",
        "salary": "90000",
        "joinDate": "2019-06-15"
      },
      {
        "id": "6",
        "firstName": "Olivia",
        "lastName": "",
        "age": "29",
        "email": "olivia.brown@example.com",
        "department": "Customer Service",
        "position": "Customer Service Representative",
        "salary": "55000",
        "joinDate": "2023-02-28"
      },
      {
        "id": "7",
        "firstName": "James",
        "lastName": "Taylor",
        "age": "38",
        "email": "james.taylor@example.com",
        "department": "Sales",
        "position": "Sales Manager",
        "salary": "75000",
        "joinDate": "2020-12-10"
      },
      {
        "id": "8",
        "firstName": "Sophia",
        "lastName": "Martinez",
        "age": "33",
        "email": "sophia.martinez@example.com",
        "department": "Product Management",
        "position": "Product Manager",
        "salary": "85000",
        "joinDate": "2021-08-20"
      },
      {
        "id": "9",
        "firstName": "Daniel",
        "lastName": "Anderson",
        "age": "31",
        "email": "daniel.anderson@example.com",
        "department": "Research and Development",
        "position": "Research Scientist",
        "salary": "80000",
        "joinDate": "2022-04-30"
      },
      {
        "id": "10",
        "firstName": "Isabella",
        "lastName": "Thomas",
        "age": "27",
        "email": "isabella.thomas@example.com",
        "department": "Quality Assurance",
        "position": "Quality Assurance Engineer",
        "salary": "65000",
        "joinDate": "2023-01-05"
      }
    ]

  employeeHeader: any[] = ['First Name', 'Last Name', 'Age', 'Email', 'Department', 'Position', 'Salary', 'Join Date']
}
