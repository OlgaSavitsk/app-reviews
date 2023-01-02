import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material/material.module';
import * as ReviewAction from '@redux/actions/review.actions';
import { ReviewControlService } from '../../services/review-control.service';

@Component({
  selector: 'app-tags-select',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule],
  templateUrl: './tags-select.component.html',
  styleUrls: ['./tags-select.component.scss'],
})
export class TagsSelectComponent implements OnInit {
  @Output() tagsEventEmiter = new EventEmitter<string[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  tagControl = new FormControl('');

  filteredTags!: Observable<string[]>;

  tags: string[] = [];

  allTags!: string[];

  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private store: Store, private reviewControlService: ReviewControlService) {}

  ngOnInit(): void {
    this.store.dispatch(ReviewAction.GetReviewsTags());
    this.reviewControlService.getAllTags().subscribe((tags) => {
      this.allTags = tags;
      this.filteredTags = this.tagControl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this.filter(tag) : this.allTags.slice()))
      );
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    this.tagsEventEmiter.emit(this.tags);
    event.chipInput!.clear();
    this.tagControl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.tagsEventEmiter.emit(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagsEventEmiter.emit(this.tags);
    this.tagsInput!.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) => tag.toLowerCase().includes(filterValue));
  }
}
