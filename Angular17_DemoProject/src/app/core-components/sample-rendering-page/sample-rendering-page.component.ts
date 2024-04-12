import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInputBoxComponent } from '../../common-libraies/common-input-box/common-input-box.component';
import { CommonDropdownComponent } from '../../common-libraies/common-dropdown/common-dropdown.component';
import { CommonTableComponent } from '../../common-libraies/common-table/common-table.component';
import { CommonFilterComponent } from '../../common-libraies/common-filter/common-filter.component';
import { StringContants } from '../../../assets/Constants/stringConstant';
import { CommonCheckboxDropdownComponent } from '../../common-libraies/common-checkbox-dropdown/common-checkbox-dropdown.component';
@Component({
  selector: 'app-sample-rendering-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonInputBoxComponent, CommonDropdownComponent, CommonTableComponent, CommonFilterComponent, CommonCheckboxDropdownComponent],
  templateUrl: './sample-rendering-page.component.html',
  styleUrl: './sample-rendering-page.component.css'
})
export class SampleRenderingPageComponent {
  inputValue = signal('');
  myForm!: FormGroup;
  userName: string = "";
  age: number = 0;
  mockData: any[] = [];
  accessLevel: string[] = [
    "Admin",
    "User",
    "Guest",
    "Super Admin"
  ];

  selectedAreas: any[] = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      age: ['', Validators.required],
      // state: ['', Validators.required],
      // currency: ['', Validators.required],
      areaName: [''],
      country: ['',],
      // pokemonData: ['', Validators.required],
      accessLevel: ['', Validators.required],
    });
    this.mockData = this.employeeDetails;

  }

  invalidForm!: boolean | null;
  getData() {
    this.userName = this.myForm.get('username')?.value;
    this.age = this.myForm.get('age')?.value;

    if (this.myForm.valid) {
      this.invalidForm = false;
      console.log(this.myForm.value);
      console.log(this.selectedAreas);
    }
    else {
      alert("Invalid Form");
      this.invalidForm = true;
    }
  }

  updateFilter(data: any) {
    console.log("From parent ",data);
    
    this.mockData = data;
  }

  getSelectedValues(data: any) {
    this.selectedAreas = data;
  }

  resetFilter() {
    this.mockData = this.employeeDetails;
  }



  users: any[] = [
    {
      "id": 1,
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "age": 25,
      "email": "jane.smith@example.com"
    },
    {
      "id": 3,
      "name": "Michael Johnson",
      "age": 35,
      "email": "michael.johnson@example.com"
    },
    {
      "id": 4,
      "name": "Emily Davis",
      "age": 28,
      "email": "emily.davis@example.com"
    },
    {
      "id": 5,
      "name": "William Wilson",
      "age": 40,
      "email": "william.wilson@example.com"
    },
    {
      "id": 6,
      "name": "Olivia Brown",
      "age": 32,
      "email": "olivia.brown@example.com"
    },
    {
      "id": 7,
      "name": "James Taylor",
      "age": 27,
      "email": "james.taylor@example.com"
    },
    {
      "id": 8,
      "name": "Sophia Martinez",
      "age": 31,
      "email": "sophia.martinez@example.com"
    },
    {
      "id": 9,
      "name": "Daniel Anderson",
      "age": 33,
      "email": "daniel.anderson@example.com"
    },
    {
      "id": 10,
      "name": "Isabella Thomas",
      "age": 29,
      "email": "isabella.thomas@example.com"
    }
  ]


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
        "startDate": "2022-01-15"
      },
      {
        "id": '2',
        "firstName": "Jane",
        "lastName": "Smith",
        "age": "28",
        "email": "jane.smith@example.com",
        "department": "Marketing",
        "position": "Marketing Manager",
        "salary": "65000",
        "startDate": "2021-11-20"
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
        "startDate": "2020-09-10"
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
        "startDate": "2023-03-05"
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
        "startDate": "2019-06-15"
      },
      {
        "id": "6",
        "firstName": "Olivia",
        "lastName": "Brown",
        "age": "29",
        "email": "olivia.brown@example.com",
        "department": "Customer Service",
        "position": "Customer Service Representative",
        "salary": "55000",
        "startDate": "2023-02-28"
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
        "startDate": "2020-12-10"
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
        "startDate": "2021-08-20"
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
        "startDate": "2022-04-30"
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
        "startDate": "2023-01-05"
      },
      {
        "id": '1',
        "firstName": "John",
        "lastName": "Doe",
        "age": '35',
        "email": "john.doe@example.com",
        "department": "Engineering",
        "position": "Software Engineer",
        "salary": '75000',
        "startDate": "2022-01-15"
      },
      {
        "id": '2',
        "firstName": "Jane",
        "lastName": "Smith",
        "age": "28",
        "email": "jane.smith@example.com",
        "department": "Marketing",
        "position": "Marketing Manager",
        "salary": "65000",
        "startDate": "2021-11-20"
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
        "startDate": "2019-06-15"
      },
      {
        "id": "6",
        "firstName": "Olivia",
        "lastName": "Brown",
        "age": "29",
        "email": "olivia.brown@example.com",
        "department": "Customer Service",
        "position": "Customer Service Representative",
        "salary": "55000",
        "startDate": "2023-02-28"
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
        "startDate": "2020-12-10"
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
        "startDate": "2021-08-20"
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
        "startDate": "2022-04-30"
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
        "startDate": "2023-01-05"
      },
      {
        "id": '1',
        "firstName": "John",
        "lastName": "Doe",
        "age": '35',
        "email": "john.doe@example.com",
        "department": "Engineering",
        "position": "Software Engineer",
        "salary": '75000',
        "startDate": "2022-01-15"
      },
      {
        "id": '2',
        "firstName": "Jane",
        "lastName": "Smith",
        "age": "28",
        "email": "jane.smith@example.com",
        "department": "Marketing",
        "position": "Marketing Manager",
        "salary": "65000",
        "startDate": "2021-11-20"
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
        "startDate": "2020-09-10"
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
        "startDate": "2023-03-05"
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
        "startDate": "2019-06-15"
      },
      {
        "id": "6",
        "firstName": "Olivia",
        "lastName": "Brown",
        "age": "29",
        "email": "olivia.brown@example.com",
        "department": "Customer Service",
        "position": "Customer Service Representative",
        "salary": "55000",
        "startDate": "2023-02-28"
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
        "startDate": "2020-12-10"
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
        "startDate": "2021-08-20"
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
        "startDate": "2022-04-30"
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
        "startDate": "2023-01-05"
      },
    ]

  employeeHeader: any[] = ['First Name', 'Last Name', 'Age', 'Email', 'Department', 'Position', 'Salary', 'Join Date']


  pokeDetails = [
    {
      "id": 1,
      "name": "Bulbasaur",
      "type": ["Grass", "Poison"],
      "height": "0.7 m",
      "weight": "6.9 kg",
      "abilities": ["Overgrow", "Chlorophyll"],
      "base_experience": 64,
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    },
    {
      "id": 4,
      "name": "Charmander",
      "type": ["Fire"],
      "height": "0.6 m",
      "weight": "8.5 kg",
      "abilities": ["Blaze", "Solar Power"],
      "base_experience": 62,
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
    },
    {
      "id": 7,
      "name": "Squirtle",
      "type": ["Water"],
      "height": "0.5 m",
      "weight": "9.0 kg",
      "abilities": ["Torrent", "Rain Dish"],
      "base_experience": 63,
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    }
    // Add more Pokémon details as needed
  ]

  pokeHeaders: any[] = ['Name', 'Type', 'Height', 'Weight', 'Abilities', 'Base Experience', 'Image'];

  filterAttributes: any[] = ['equals', 'not equals', 'begins with', 'not begins with', 'ends with', 'not ends with'];


}
