import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import '@github/markdown-toolbar-element';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown-editor',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent implements OnInit {
  @Input() control!: FormControl<string>;

  template: string | null = null;

  action = 'preview';

  @ViewChild('textarea') tagsInput!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.control = this.control ?? new FormControl('');
  }

  onPreview() {
    if (this.action === 'edit') {
      this.template = null;
      this.action = 'preview';
    } else {
      this.template = marked.parse(this.control.value);
      this.action = 'edit';
    }
  }
}
