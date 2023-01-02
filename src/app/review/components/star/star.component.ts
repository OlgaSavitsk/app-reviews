import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent {
  @Input() rating = 0;

  @Output() ratingEmiter = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  updateRating(i: number): void {
    this.rating = i;
    this.ratingEmiter.emit(i);
  }
}
