import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserInfo } from 'src/app/models/user.interfaces';
import * as fromUser from 'src/app/redux/selectors/collection.selector';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient, private store: Store) {}

  getCurrentUser(): Observable<UserInfo | null> {
    return this.store.select(fromUser.getUserStore).pipe(
      filter(({ isFetched }) => isFetched),
      map(({ user }) => user),
    );
  }

  getCurrentUsers(): Observable<UserInfo[]> {
    return this.store.select(fromUser.getUserStore).pipe(
      //filter(({ loading }) => loading),
      map(({ users }) => users),
    );
  }

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`user/${id}`);
  }

  updateUserStatus(user: UserInfo, status: UserInfo['status']) {
    return this.http.put<UserInfo>(
      `user/${user.id}`,
      { status },
      { withCredentials: true },
    );
  }

  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>('user', {
      withCredentials: true,
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`user/${id}`, {
      withCredentials: true,
    });
  }
}
