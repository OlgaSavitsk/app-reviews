import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import '@github/markdown-toolbar-element';

import { MaterialModule } from 'src/app/material/material.module';
import * as ReviewAction from '@redux/actions/review.actions';
import { DragDirective, FileHandle } from '@core/directives/drag.directive';
import { FileService } from '@review/services/file.service';
import { defaultFilePath, FILM_CATEGORIES, MARKS, ReviewDialogAction } from 'src/app/app.constants';
import { TagsSelectComponent } from '@review/components/tags-select/tags-select.component';
import { MarkdownEditorComponent } from '@review/components/markdown-editor/markdown-editor.component';
import { ReviewInfo } from 'src/app/models/review.interface';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    NgOptimizedImage,
    DragDirective,
    TagsSelectComponent,
    MarkdownEditorComponent,
  ],
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
})
export class ReviewDialogComponent implements OnInit {
  reviewForm!: FormGroup;

  dialogAction = ReviewDialogAction.addDialogAction;

  action = this.translateService.instant('DIALOG.ADD_ACTION');

  buttonAction = this.translateService.instant('BUTTON.CANCEL');

  categories: string[] | undefined;

  file: File | undefined | null;

  defaultImage: SafeUrl | undefined;

  imageSrc: SafeUrl | undefined;

  marks: number[] = MARKS;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public dialogData: { data: ReviewInfo | string; action: string },
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    private fileService: FileService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService
      .stream(FILM_CATEGORIES)
      .subscribe((categories) => (this.categories = Object.values(categories)));
    this.renderFileSrc(defaultFilePath);
    this.buildForm();
    if (this.dialogData.action === this.translateService.instant('DIALOG.dataEditAction')) {
      this.renderEditData();
    }
  }

  renderFileSrc(filePath: string): void {
    this.fileService.getReviewImage(filePath).subscribe((fileUrl) => {
      if (filePath === defaultFilePath) {
        this.defaultImage = fileUrl;
      } else {
        this.imageSrc = fileUrl;
      }
    });
  }

  renderEditData() {
    this.dialogAction = ReviewDialogAction.editDialogAction;
    this.action = this.translateService.instant('DIALOG.EDIT_BUTTON');
    this.buttonAction = this.translateService.instant('BUTTON.CLOSE');
    this.renderFileSrc((this.dialogData.data as ReviewInfo).filePath);
    this.reviewForm.patchValue(this.dialogData.data as ReviewInfo);
    this.fileService
      .getReviewFile((this.dialogData.data as ReviewInfo).filePath)
      .subscribe((file) => {
        this.reviewForm.patchValue({
          image: file,
        });
      });
  }

  buildForm() {
    this.reviewForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      title: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      score: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null),
      like: new FormControl(null),
    });
  }

  submit() {
    this.dialogAction === ReviewDialogAction.editDialogAction ? this.edit() : this.add();
    this.dialogRef.close();
  }

  add() {
    const formDataReview = this.reviewForm.value;
    const data = {
      ...formDataReview,
      tags: [formDataReview.tags],
    };
    const reviewFormData = this.prepeareFormData(data);
    this.store.dispatch(
      ReviewAction.SaveReview({
        review: reviewFormData,
        userId: this.dialogData.data as string,
        file: this.file!,
      })
    );
  }

  edit() {
    const formDataReview = this.reviewForm.value;
    const data = {
      ...formDataReview,
      id: (this.dialogData.data as ReviewInfo).id,
    };
    const reviewFormData = this.prepeareFormData(data);
    this.store.dispatch(
      ReviewAction.UpdateReview({
        review: reviewFormData,
        reviewId: (this.dialogData.data as ReviewInfo).id,
      })
    );
  }

  prepeareFormData(review: ReviewInfo) {
    const formData = new FormData();
    formData.set('review', JSON.stringify(review));
    formData.set('image', this.reviewForm.value.image);
    return formData;
  }

  onFileSelect(event: EventTarget | null) {
    const target = event as HTMLInputElement;
    const { files } = target;
    if (target.files) {
      this.file = files?.item(0);
      this.reviewForm.patchValue({ image: this.file });
      this.imageSrc = this.fileService.typedArrayToURL(this.file!);
    }
  }

  fileDropped(fileHandle: FileHandle) {
    this.file = fileHandle.file;
    this.imageSrc = fileHandle.url;
    this.reviewForm.patchValue({ image: this.file });
  }

  addTags(tags: string[]) {
    this.reviewForm.patchValue({ tags });
  }
}
