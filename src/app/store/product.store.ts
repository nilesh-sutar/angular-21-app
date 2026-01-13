import { inject } from "@angular/core";
import { Product } from "@interfaces";
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { ProductApi } from "../shared/services/product-api";
import { CartStore } from "./cart.store";

export interface ProductState {
    products: Product[];
    error?: string;
    isLoading: boolean;
    product?: Product;
}

export const productInitialState: ProductState = {
    products: [],
    error: "",
    isLoading: false,
    product: undefined
};

export const ProductStore = signalStore(
    { providedIn: 'root' },
    withState(productInitialState),
    withProps(() => ({
        productApiService: inject(ProductApi),
        cartStore: inject(CartStore)
    })),
    withMethods(({ productApiService, cartStore, ...store }) => ({
        fetchProducts: async () => {
            patchState(store, { isLoading: true, error: "" });
            try {
                const products = await productApiService.getProducts().toPromise();
                patchState(store, { products: products, isLoading: false });
            } catch (error) {
                patchState(store, { error: "Failed to fetch products", isLoading: false });
            }
        },
        fetchProductById: async (id: number): Promise<Product | null> => {
            patchState(store, { isLoading: true, error: "" });
            try {
                const product = await productApiService.getProductById(id).toPromise() as Product;
                patchState(store, { product: product, isLoading: false });
                return product;
            } catch (error) {
                patchState(store, { error: "Failed to fetch product", isLoading: false });
                return null;
            }
        }
    })));