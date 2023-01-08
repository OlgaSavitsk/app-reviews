import { Pipe, PipeTransform } from '@angular/core';
import { MessageInfo } from 'src/app/models/message.interfaces';

@Pipe({
  name: 'filter',
  standalone: true,
})
export default class FilterMessagePipe implements PipeTransform {
  transform(value: MessageInfo[], param: string | undefined): MessageInfo[] {
    return value
      .filter((message) => message.reviewId === param)
      .sort((a: MessageInfo, b: MessageInfo) => (a.createdAt < b.createdAt ? -1 : 1));
  }
}
