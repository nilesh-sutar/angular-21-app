import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@states/app.state';
import { selectCount } from '@states/counter/counter.selectors';
import { decrement, increment, reset } from '@states/counter/counter.actions';
import { CounterStore } from 'src/app/store/counter.store';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <p>Single : {{counterState.count()}}</p>
      <p>Double : {{counterState.doubleCount()}}</p>
      <button class="btn btn-primary" (click)="counterState.increment()">Inc</button>
      <button class="btn btn-secondary" (click)="counterState.decrement()">Dec</button>
      <button class="btn btn-danger" (click)="counterState.reset()">Reset</button>
    </div>
  `,
  styles: ['.counter{display:flex;gap:1rem;align-items:center}'],
  imports: []
})
export class CounterComponent {

  private store = inject(Store<AppState>);
  count$ = this.store.select(selectCount);
  counterState = inject(CounterStore)

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
