import { Product } from '@interfaces';
import { createReducer, on } from '@ngrx/store';
import { fetchProductsFailure, fetchProductsSuccess } from './product.actions';

export interface ProductState {
    products: Product[];
    error?: string;
    isLoading: boolean;
}

export const productInitialState: ProductState = {
    products: [],
    error: "",
    isLoading: false
};

export const productReducer = createReducer(
    productInitialState,
    on(fetchProductsSuccess, (state, { products }) => ({ ...state, products, error: "", isLoading: false })),
    on(fetchProductsFailure, (state, { error }) => ({ ...state, error, isLoading: false }))
);