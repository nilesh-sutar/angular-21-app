import { withComputed, withMethods } from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { signalStore, withState } from '@ngrx/signals';
import { Product } from './../config/interfaces/interfaces';
import { computed } from '@angular/core';

export interface CartState {
    products: Product[];
}

const initialState: CartState = {
    products: []
};

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ products }) => ({
        totalPrice: computed(() => calculateTotal(products()))
    })),
    withMethods(({ products, ...store }) => ({
        addToCart: (product: Product) => {
            const updatedProducts = [...products(), product];
            patchState(store, { products: updatedProducts });
        },
        removeFromCart: (product: Product) => {
            const updatedProducts = products().filter(p => p.id !== product.id);
            patchState(store, { products: updatedProducts });
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