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
            await simulateDelay(1000); // 1 second delay
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
        incrementQuantity: async (product: Product) => {
            patchState(store, { loadingProductId: product.id });
            const updatedProducts = products().map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
            await simulateDelay(1000); // 1 second delay
            patchState(store, { products: updatedProducts, loadingProductId: null });
            store.toasterService.showSuccess(`You've changed '${product.title}' QUANTITY to '${product.quantity + 1}'`);
        },
        decrementQuantity: async (product: Product) => {
            patchState(store, { loadingProductId: product.id });
            const updatedProducts = products().map(p => p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p);
            await simulateDelay(1000); // 1 second delay
            patchState(store, { products: updatedProducts, loadingProductId: null });
            store.toasterService.showSuccess(`You've changed '${product.title}' QUANTITY to '${product.quantity - 1}'`);
        }
    }))
);

export function simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function calculateTotal(products: Product[]): number {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
}