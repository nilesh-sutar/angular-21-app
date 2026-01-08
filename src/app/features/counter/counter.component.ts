import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@states';
import { AsyncPipe } from '@angular/common';
import { selectCount } from '@states/selectors';
import { decrement, increment, reset } from '@states/actions';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <button class="btn btn-primary" (click)="increment()">Inc</button>
      <button class="btn btn-secondary" (click)="decrement()" [disabled]="(count$ | async) === 0">Dec</button>
      <p>{{count$ | async}}</p>
      <button class="btn btn-danger" (click)="reset()">Reset</button>
    </div>
  `,
  styles: ['.counter{display:flex;gap:1rem;align-items:center}'],
  imports: [AsyncPipe],
})
export class CounterComponent {

  private store = inject(Store<AppState>);
  count$ = this.store.select(selectCount);

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

}
