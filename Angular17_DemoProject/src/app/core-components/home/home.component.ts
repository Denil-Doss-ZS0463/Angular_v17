import { Component } from '@angular/core';
import { PageUnderDevComponent } from '../../basic-components/page-under-dev/page-under-dev.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageUnderDevComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
