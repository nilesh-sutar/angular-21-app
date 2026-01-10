import { CartState } from "@states/cart";
import { ProductState } from "./products/product.reducer";
import { CounterState } from '@states/counter';

export interface AppState {
    counter: CounterState,
    cart: CartState,
    products: ProductState
}