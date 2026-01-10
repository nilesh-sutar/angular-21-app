import { createSelector } from '@ngrx/store';
import { AppState } from '@states/app.state';

const selectCartState = (state: AppState) => state.cart;

export const selectCartProducts = createSelector(selectCartState, state => state.products);

export const selectCartTotal = createSelector(selectCartState, state => state.totalPrice);
