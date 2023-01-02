import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUser from '@redux/selectors/collection.selector';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewControlService {
  constructor(private store: Store) {}

  getAllTags(): Observable<string[]> {
    return this.store.select(fromUser.selectTags).pipe(map((tags) => tags));
  }

  addRating() {}
}
