import { Component } from '@angular/core';
import { PageUnderDevComponent } from '../../basic-components/page-under-dev/page-under-dev.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [PageUnderDevComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}
