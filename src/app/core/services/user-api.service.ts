import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

import { UserInfo } from 'src/app/models/user.interfaces';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
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

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`user/${id}`);
  }

  updateUserStatus(
    status: UserInfo['status'],
    id: string,
  ): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${environment.BASE_URL}/user/${id}`, {
      status,
    });
  }

  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${environment.BASE_URL}/user`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.BASE_URL}/user/${id}`);
  }
}
