import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Product, Review } from '@interfaces';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Rating } from 'src/app/shared/components/rating/rating';

@Component({
  selector: 'app-rating-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ modalData().title }}</h4>
      <button
        type="button"
        class="btn-close close pull-right"
        aria-label="Close"
        (click)="bsModalRef().hide()"
      >
        <span aria-hidden="true" class="visually-hidden">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div>
        <app-rating [rating]="modalData().product?.rating" />
        <p>based on {{ modalData().product?.reviews?.length }} Reviews</p>
      </div>
      <ul class="list-group">
        @for (item of modalData().list; track item) {
          <li class="list-group-item">
            <div class="d-flex justify-content-between gap-2">
              <div>
                <app-rating [rating]="item.rating" [showRatingLabel]="false" />
                <p>
                  {{ item.comment }}
                </p>
              </div>
              <p>
                {{ item.date | date: 'mediumDate' }}
              </p>
            </div>
            <div>
              <p>
                {{ item.reviewerName }}
              </p>
              <!-- <p>
                {{ item.reviewerEmail }}
              </p> -->
            </div>
          </li>
        }
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef().hide()">
        {{ modalData().closeBtnName }}
      </button>
    </div>
  `,
  styles: [``],
  imports: [DatePipe, Rating],
})
export class RatingModal {
  modalData = signal({
    product: null as Product | null,
    list: [] as Review[],
    title: '',
    closeBtnName: 'Close',
  });

  bsModalRef = signal(inject(BsModalRef));
}
