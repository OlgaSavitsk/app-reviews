import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '@core/services/chat.service';
import { MaterialModule } from 'src/app/material/material.module';
import { UserApiService } from '@core/services/user-api.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule],
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(public chatService: ChatService, private userService: UserApiService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      messageText: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    const { messageText } = this.formGroup.value;
    this.chatService.sendMessage(messageText);
    this.formGroup.reset();
  }
}
