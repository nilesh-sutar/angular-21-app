import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
    <div class="fs-6 my-2" [class.cursor-pointer]="finalConfig().cursor" (click)="onClick.emit()">
      <span
        class="badge d-inline-flex align-items-center gap-1"
        [ngClass]="'bg-' + ratingInfo().class"
      >
        {{ finalConfig().rating.toFixed(1) }}
        <span class="material-icons fs-6">star</span>
        @if (finalConfig().reviewsCount) {
          | {{ finalConfig().reviewsCount }}
        }
      </span>
      @if (finalConfig().showRatingLabel) {
        <span class="ms-2 badge text-black rating-label">{{
          ratingInfo().label
        }}</span>
      }
    </div>
  `,
  styles: [`.rating-label{background-color: rgba(245, 245, 245, 1.00)}`],
  imports: [NgClass],
})
export class Rating {
  config = input<RatingConfig>({
    rating: 0,
    reviewsCount: 0,
    showRatingLabel: true,
    cursor: false,
  });

  finalConfig = computed(() => {
    const c = this.config() || ({} as RatingConfig);
    return {
      rating: c.rating ?? 0,
      reviewsCount: c.reviewsCount ?? 0,
      showRatingLabel: c.showRatingLabel ?? true,
      cursor: c.cursor ?? false,
    };
  });

  onClick = output<void>();

  // Optimized: Single computed returns both class and label
  ratingInfo = computed(() => {
    const rating = this.finalConfig().rating;
    if (!rating) return { class: '', label: '' };

    if (rating >= 4) {
      return { class: 'success', label: 'Excellent' };
    } else if (rating >= 2) {
      return { class: 'warning', label: 'Average' };
    } else {
      return { class: 'danger', label: 'Poor' };
    }
  });
}

export interface RatingConfig {
  rating?: number;
  reviewsCount?: number;
  showRatingLabel?: boolean;
  cursor?: boolean;
}
