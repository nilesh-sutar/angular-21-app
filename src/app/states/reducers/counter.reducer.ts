import { createReducer, on } from '@ngrx/store';
import * as CounterActions from '../actions/counter.actions';

export const counterFeatureKey = 'counter';

export interface CounterState {
    count: number;
}

export const initialState: CounterState = {
    count: 0
};

export const counterReducer = createReducer(
    initialState,
    on(CounterActions.increment, state => ({ ...state, count: state.count + 1 })),
    on(CounterActions.decrement, state => ({ ...state, count: Math.max(0, state.count - 1) })),
    on(CounterActions.reset, () => ({ ...initialState }))
);
