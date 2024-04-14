import { Component } from '@angular/core';
import { PageUnderDevComponent } from '../../../basic-components/page-under-dev/page-under-dev.component';

@Component({
  selector: 'app-merchandise',
  standalone: true,
  imports: [PageUnderDevComponent],
  templateUrl: './merchandise.component.html',
  styleUrl: './merchandise.component.css',
})
export class MerchandiseComponent {}
