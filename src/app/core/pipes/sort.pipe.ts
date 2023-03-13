import { Pipe, PipeTransform } from '@angular/core';
import { SortParam } from 'src/app/app.constants';
import { ReviewInfo } from 'src/app/models/review.interface';

@Pipe({
  name: 'sort',
  standalone: true,
})
export default class SortPipe implements PipeTransform {
  transform(value: ReviewInfo[], param: string | undefined): ReviewInfo[] {
    if (param === SortParam.dateParam) {
      this.sort(value, this.sortByDate);
    }
    if (param === SortParam.scoreParam) {
      this.sort(value, this.sortByScore);
    }
    return value;
  }

  private sort(data: ReviewInfo[], action: Function): ReviewInfo[] {
    const sorted = data.sort((a: ReviewInfo, b: ReviewInfo) => (action(a, b) ? -1 : 1));
    return sorted;
  }

  private sortByDate(a: ReviewInfo, b: ReviewInfo): boolean {
    return a.createdAt > b.createdAt;
  }

  private sortByScore(a: ReviewInfo, b: ReviewInfo): boolean {
    return a.score > b.score;
  }
}
