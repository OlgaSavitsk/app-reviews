import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File | undefined;
  url: SafeUrl;
}
@Directive({
  selector: '[appDrag]',
  standalone: true,
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding('style.background') private background = '#eee';

  @HostBinding('style.border') private border = 'dashed 1px #aaa';

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#999';
    this.border = 'dashed 2px #673ab7';
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#eee';
    this.border = 'dashed 1px #aaa';
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#eee';
    this.border = 'dashed 1px #aaa';

    let fileHandle: FileHandle | null = null;
    const file = event.dataTransfer?.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file!));

    fileHandle = { file, url };
    this.files.emit(fileHandle);
  }
}
