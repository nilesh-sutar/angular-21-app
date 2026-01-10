import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export const counterFeatureKey = 'counter';

export interface CounterState {
    count: number;
}

export const counterInitialState: CounterState = {
    count: 0
};

export const counterReducer = createReducer(
    counterInitialState,
    on(CounterActions.increment, state => ({ ...state, count: state.count + 1 })),
    on(CounterActions.decrement, state => ({ ...state, count: Math.max(0, state.count - 1) })),
    on(CounterActions.reset, () => ({ ...counterInitialState }))
);
