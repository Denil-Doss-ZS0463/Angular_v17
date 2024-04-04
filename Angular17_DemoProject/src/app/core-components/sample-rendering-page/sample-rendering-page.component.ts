import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInputBoxComponent } from '../../common-libraies/common-input-box/common-input-box.component';
import { CommonDropdownComponent } from '../../common-libraies/common-dropdown/common-dropdown.component';

@Component({
  selector: 'app-sample-rendering-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonInputBoxComponent, CommonDropdownComponent],
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
      currency: [''],
      areaName: ['']
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


}
