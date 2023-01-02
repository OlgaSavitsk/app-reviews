import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export default class FooterComponent {}
