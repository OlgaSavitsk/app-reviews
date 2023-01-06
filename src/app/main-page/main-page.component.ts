import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '@review/components/rating/rating.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
