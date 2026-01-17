import { withComputed, withMethods, withProps } from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { signalStore, withState } from '@ngrx/signals';
import { Product } from './../config/interfaces/interfaces';
import { computed, inject } from '@angular/core';
import { NgxToasterService } from '../shared/services/ngx-toaster.service';

export interface CartState {
    products: Product[];
    loadingProductId: number | null;
}

const initialState: CartState = {
    products: [],
    loadingProductId: null
};

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ products }) => ({
        totalPrice: computed(() => calculateTotal(products()))
    })),
    withProps(() => ({
        toasterService: inject(NgxToasterService)
    })),
    withMethods(({ products, loadingProductId, ...store }) => ({
        addToCart: async (product: Product) => {
            patchState(store, { loadingProductId: product.id });
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            const updatedProducts = [...products(), product];
            patchState(store, { products: updatedProducts, loadingProductId: null });
            store.toasterService.showSuccess('Product added to cart successfully');
        },
        removeFromCart: (product: Product) => {
            const updatedProducts = products().filter(p => p.id !== product.id);
            patchState(store, { products: updatedProducts });
            store.toasterService.showSuccess('Product removed from cart successfully');
        },
        emptyCart: () => {
            patchState(store, { products: [] });
        },
        incrementQuantity: (product: Product) => {
            const updatedProducts = products().map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
            patchState(store, { products: updatedProducts });
        },
        decrementQuantity: (product: Product) => {
            const updatedProducts = products().map(p => p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p);
            patchState(store, { products: updatedProducts });
        }
    }))
);

export function calculateTotal(products: Product[]): number {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
}