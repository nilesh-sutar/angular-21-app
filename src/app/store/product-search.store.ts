import { inject } from '@angular/core';
import { Product } from "@interfaces";
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { ProductStore } from "./product.store";

export interface ProductSearchState {
    query: string;
    results: Product[];
    isLoading: boolean;
    error?: string;
}

export const productSearchInitialState: ProductSearchState = {
    query: "",
    results: [],
    isLoading: false,
    error: undefined
};

export const ProductSearchStore = signalStore(
    { providedIn: 'root' },
    withState(productSearchInitialState),
    withProps(() => ({
        productStore: inject(ProductStore)
    })),
    withMethods(({ productStore, ...store }) => ({
        searchProducts: async (query: string) => {
            patchState(store, { isLoading: true, error: undefined, query });
            try {
                // Ensure products are loaded
                if (productStore.products().length === 0) {
                    await productStore.fetchProducts();
                }
                const results = productStore.products().filter(product =>
                    product.title.toLowerCase().includes(query.toLowerCase())
                );
                patchState(store, { results, isLoading: false });
            } catch (error) {
                patchState(store, { error: 'Unable to fetch products', isLoading: false, results: [] });
            }
        }
    })));