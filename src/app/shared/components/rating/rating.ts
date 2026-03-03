import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
    <a class="fs-5" [class.cursor-pointer]="pointerClass()" (click)="onClick.emit()">
      <span class="badge bg-black d-inline-flex align-items-center gap-1">
        {{ rating()?.toFixed(1) ?? 0 }}
        <span class="material-icons fs-6" [ngClass]="'text-' + ratingClass()">star</span>
        @if (reviewsCount()) {
          | {{ reviewsCount() }}
        }
      </span>
      @if (showRatingLabel()) {
        <span class="ms-2 badge" [ngClass]="'bg-' + ratingClass()">{{ ratingLabel() }}</span>
      }
    </a>
  `,
  styles: [``],
  imports: [NgClass],
})
export class Rating {
  rating = input<number | undefined>(0);
  reviewsCount = input<number | undefined>(0);
  showRatingLabel = input<boolean>(true);
  onClick = output<void>();
  pointerClass = computed(() => (this.reviewsCount() ? 'cursor-pointer' : ''));

  ratingClass = computed(() => {
    const rating = this.rating();
    if (!rating) return '';
    if (rating >= 4) {
      return 'success';
    } else if (rating >= 2) {
      return 'warning';
    } else {
      return 'danger';
    }
  });

  ratingLabel = computed(() => {
    const rating = this.rating();
    if (!rating) return '';
    if (rating >= 4) {
      return 'Excellent';
    } else if (rating >= 2) {
      return 'Average';
    } else {
      return 'Poor';
    }
  });
}
