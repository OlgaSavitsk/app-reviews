import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getReviewFile(fileName: string): Observable<File> {
    return this.http.get(`review/picture/${fileName}`, { responseType: 'blob' }).pipe(
      map(
        (file) =>
          new File([new Blob([file], { type: 'blob' })], fileName, {
            type: file.type,
          })
      )
    );
  }

  getReviewImage(fileName: string): Observable<SafeUrl> {
    return this.getReviewFile(fileName).pipe(
      map((filePath: Blob) => this.typedArrayToURL(new Blob([filePath], { type: 'blob' })))
    );
  }

  typedArrayToURL(obj: Blob): SafeUrl {
    const url = window.URL.createObjectURL(obj);
    const fileUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    return fileUrl;
  }
}
