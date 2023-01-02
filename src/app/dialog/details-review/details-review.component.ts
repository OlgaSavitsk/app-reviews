import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material/material.module';
import { StarComponent } from 'src/app/review/components/star/star.component';
import { FileService } from 'src/app/review/services/file.service';
import * as ReviewAction from '@redux/actions/review.actions';
import { ReviewControlService } from 'src/app/review/services/review-control.service';
import { marked } from 'marked';

@Component({
  selector: 'app-details-review',
  standalone: true,
  imports: [CommonModule, TranslateModule, MaterialModule, NgOptimizedImage, StarComponent],
  templateUrl: './details-review.component.html',
  styleUrls: ['./details-review.component.scss'],
})
export class DetailsReviewComponent implements OnInit {
  imageSrc: SafeUrl | undefined;

  allTags: string[] | undefined;

  template: string | undefined;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<DetailsReviewComponent>,
    private fileService: FileService,
    private translateService: TranslateService,
    private reviewControlService: ReviewControlService
  ) {}

  ngOnInit() {
    this.renderFileSrc(this.dialogData.data.filePath);
    this.renderTags();
    this.renderDescription();
  }

  renderFileSrc(filePath: string) {
    this.fileService.getReviewImage(filePath).subscribe((fileUrl) => {
      this.imageSrc = fileUrl;
    });
  }

  renderTags() {
    this.store.dispatch(ReviewAction.GetReviewsTags());
    this.reviewControlService.getAllTags().subscribe((tags) => {
      this.allTags = tags;
    });
  }

  renderDescription() {
    this.template = marked.parse(this.dialogData.data.description);
  }

  addRating(ratingValue: number) {
    console.log(ratingValue);
  }
}
