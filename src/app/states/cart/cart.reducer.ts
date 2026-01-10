import { Product } from '@interfaces';
import { createReducer, on } from '@ngrx/store';
import { addToCart, calculateCartTotal, decrementQuantity, emptyCart, incrementQuantity, removeFromCart } from '../cart/cart.actions';

export interface CartState {
    products: Product[];
    totalPrice?: number;
}

export const cartInitialState: CartState = {
    products: [],
    totalPrice: 0
};

export function calculateTotal(products: Product[]): number {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
}

export const cartReducer = createReducer(
    cartInitialState,
    on(addToCart, (state, { product }) => ({ ...state, products: [...state.products, product], totalPrice: calculateTotal([...state.products, product]) })),
    on(incrementQuantity, (state, { product }) => {
        const index = state.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            const updatedProducts = [...state.products];
            updatedProducts[index] = { ...updatedProducts[index], quantity: updatedProducts[index].quantity + 1 };
            return { ...state, products: updatedProducts, totalPrice: calculateTotal(updatedProducts) };
        }
        return state;
    }),
    on(decrementQuantity, (state, { product }) => {
        const index = state.products.findIndex(p => p.id === product.id);
        if (index !== -1 && state.products[index].quantity > 1) {
            const updatedProducts = [...state.products];
            updatedProducts[index] = { ...updatedProducts[index], quantity: updatedProducts[index].quantity - 1 };
            return { ...state, products: updatedProducts, totalPrice: calculateTotal(updatedProducts) };
        }
        return state;
    }),
    on(removeFromCart, (state, { product }) => ({
        ...state,
        products: state.products.filter(p => p.id !== product.id),
        totalPrice: calculateTotal(state.products.filter(p => p.id !== product.id))
    })),
    on(emptyCart, (state) => ({
        ...state,
        products: [],
        totalPrice: 0
    })),
    on(calculateCartTotal, (state, { products }) => ({
        ...state,
        products: products,
        totalPrice: calculateTotal(products)
    }))
);