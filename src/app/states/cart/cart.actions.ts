import { Product } from "@interfaces";
import { createAction, props } from "@ngrx/store";

export const addToCart = createAction('[Cart Component] Add To Cart', props<{ product: Product }>());

export const incrementQuantity = createAction('[Cart Component] Increment Quantity', props<{ product: Product }>());

export const decrementQuantity = createAction('[Cart Component] Decrement Quantity', props<{ product: Product }>());

export const removeFromCart = createAction('[Cart Component] Remove From Cart', props<{ product: Product }>());

export const emptyCart = createAction('[Cart Component] Empty Cart');

export const calculateCartTotal = createAction('[Cart Component] Calculate Total', props<{ products: Product[] }>());

