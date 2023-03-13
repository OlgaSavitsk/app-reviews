import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { MessageInfo } from 'src/app/models/message.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  joined = false;
  socket: Socket;
  messagesResponse: MessageInfo[] = [];
  id: string | undefined;

  constructor() {
    this.socket = io(environment.BASE_URL);
    this.getMessage();
  }

  getMessage(): void {
    this.socket.emit('findAllMessages', {}, (response: MessageInfo[]) => {
      this.messagesResponse = response;
    });
    this.socket.on('message', (response: MessageInfo) => {
      this.messagesResponse.push(response);
      this.messagesResponse = this.messagesResponse.filter(
        (message) => message.reviewId === this.id
      );
    });
  }

  sendMessage(messageText: string): void {
    this.socket.emit('createMessage', { text: messageText }, () => {});
  }

  join(name: string): void {
    this.id = name;
    this.socket.emit('join', name, () => {
      this.joined = true;
    });
  }
}
