import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductApi } from "src/app/shared/services/product-api";
import { fetchProducts, fetchProductsFailure, fetchProductsSuccess } from "./product.actions";
import { catchError, map, of, switchMap } from "rxjs";

export class ProductEffects {
    private actions$ = inject(Actions);
    private productApiService = inject(ProductApi);

    fetchProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fetchProducts),
            switchMap(() =>
                this.productApiService.getProducts().pipe(
                    map(products => fetchProductsSuccess({ products })),
                    catchError(error => of(fetchProductsFailure({ error: error.message })))
                )
            )
        )
    });
}