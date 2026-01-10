import { ProductState } from './product.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectProductFeature = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(selectProductFeature, (state) => state.products);

export const selectProductError = createSelector(selectProductFeature, (state) => state.error); 