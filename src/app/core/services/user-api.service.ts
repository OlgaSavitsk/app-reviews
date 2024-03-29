import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserInfo, UserUpdate } from 'src/app/models/user.interfaces';
import * as fromUser from '@redux/selectors/collection.selector';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient, private store: Store) {}

  getCurrentUser(): Observable<UserInfo | null> {
    return this.store.select(fromUser.selectUserStore).pipe(
      filter(({ isFetched }) => isFetched),
      map(({ user }) => user)
    );
  }

  getCurrentUsers(): Observable<UserInfo[]> {
    return this.store.select(fromUser.selectUserStore).pipe(map(({ users }) => users));
  }

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`user/${id}`, { withCredentials: true });
  }

  updateUserStatus(user: UserInfo, updateDto: UserUpdate): Observable<UserInfo> {
    return this.http.put<UserInfo>(`user/${user.id}`, updateDto, { withCredentials: true });
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
