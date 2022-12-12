import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserAuth, UserInfo } from 'src/app/models/user.interfaces';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.BASE_URL}/user/${id}`);
  }

  updateUserStatus(status: UserInfo['status'], id: string): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${environment.BASE_URL}/user/${id}`, { status });
  }

  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${environment.BASE_URL}/user`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.BASE_URL}/user/${id}`);
  }
}
