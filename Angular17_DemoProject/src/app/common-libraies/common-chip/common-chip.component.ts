import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-chip',
  standalone: true,
  imports: [],
  templateUrl: './common-chip.component.html',
  styleUrl: './common-chip.component.css'
})
export class CommonChipComponent {

  @Input() chips!: string[];
  @Input() text!: any;
  @Output() remove = new EventEmitter<any>();

  
  removeChip() {
    this.remove.emit(this.text);
  }
}
