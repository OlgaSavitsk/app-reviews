import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export interface StorageUser {
  token: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private usedLocalStorage: Storage | undefined;

  currentData: string | StorageUser | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.usedLocalStorage = this.getWindowRef();
  }

  getWindowRef(): Storage | undefined {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage;
    }
    return undefined;
  }

  getStorageItem(storageName: string): string | null {
    if (this.usedLocalStorage) {
      const storageData = this.usedLocalStorage.getItem(storageName);
      return storageData;
    }
    return null;
  }

  loadFromLocalStorage(storageName: string) {
    const storageData = this.getStorageItem(storageName);
    const checkStorageData = (data: string | null | undefined) => data;
    if (!checkStorageData(storageData)) {
      this.currentData = '';
    } else {
      const data: StorageUser = JSON.parse(storageData!);
      this.currentData = data;
    }
    return this.currentData;
  }

  getStorageData(): string | StorageUser | undefined {
    return this.currentData;
  }

  setStorageData({ token, name }: StorageUser, storageName: string): void {
    this.currentData = { token, name };
    this.saveToStorage(storageName);
  }

  saveToStorage(storageName: string): void {
    if (this.usedLocalStorage) {
      this.usedLocalStorage.setItem(storageName, JSON.stringify(this.currentData));
    }
  }

  removeStorage(storageName: string): void {
    if (this.usedLocalStorage) {
      this.usedLocalStorage.removeItem(storageName);
    }
  }
}
