import { Pipe, PipeTransform } from '@angular/core';

export const dateParams = {
  SECONDS: 60,
  MINUTS: 60,
  HOURS: 24,
  DAY: 30,
  MONTHS: 12,
};

export const dataUnit = [' second', ' minut', ' hour', ' day', ' month', ' year'];

@Pipe({
  name: 'dateAgo',
  standalone: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: string): unknown {
    if (!value) return 'a long time ago';

    let timeDiff = (new Date().getTime() - Date.parse(value)) / 1000;
    if (timeDiff < 10) {
      return 'just now';
    }
    if (timeDiff < 60) {
      return 'a moment ago';
    }
    let i;
    for (i = 0; Math.floor(timeDiff / Object.values(dateParams)[i]); i += 1) {
      timeDiff /= Object.values(dateParams)[i];
    }

    const plural = Math.floor(timeDiff) > 1 ? 's' : '';
    return `${Math.floor(timeDiff) + dataUnit[i] + plural} ago`;
  }
}
