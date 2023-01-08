import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { NewMessageComponent } from './new-message/new-message.component';
import { ListMessageComponent } from './list-message/list-message.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MaterialModule, NewMessageComponent, ListMessageComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @Input() id!: string;
}
