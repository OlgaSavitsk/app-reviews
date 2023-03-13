import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import FilterMessagePipe from '@core/pipes/filter-message.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { ChatService } from '@core/services/chat.service';
import { selectReviewById } from '@redux/selectors/collection.selector';
import { ReviewControlService } from '@review/services/review-control.service';
import { UserInfo } from 'src/app/models/user.interfaces';
import { NewMessageComponent } from '../new-message/new-message.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-list-message',
  standalone: true,
  imports: [CommonModule, MaterialModule, NewMessageComponent, FilterMessagePipe],
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss'],
})
export class ListMessageComponent implements OnInit {
  @Input() id!: string;
  user: Observable<UserInfo> | undefined;

  constructor(
    public chatService: ChatService,
    private store: Store,
    private reviewControlService: ReviewControlService
  ) {}

  ngOnInit(): void {
    this.store.select(selectReviewById(this.id)).pipe(map((data) => {
      if (data) {
        this.user = this.reviewControlService.getUserById(data.userId).pipe();
      }
    }));
    this.chatService.join(this.id);
  }
}
