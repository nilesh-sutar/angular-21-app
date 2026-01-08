# Store (NgRx) + Signals

This project uses NgRx for application state and exposes Signals for use in components via facades.

Key points
- Root store is registered in `src/app/app.config.ts` via `provideStore()`.
- Feature state for the counter is registered using `provideState(counterFeatureKey, counterReducer)`.
- Use the `CounterFacade` (`src/app/features/counter/counter.facade.ts`) to interact with the store. The facade exposes a `Signal<number>` (`count`) and action helpers (`increment()`, `decrement()`, `reset()`).

Install packages

Run locally:

```bash
npm install
# or
npm ci
```

Then run lint/build/tests to verify:

```bash
npm run lint
npm run build
npm test
```

Notes
- The facade exposes store selectors as Signals using `selectSignal()` from `@ngrx/signals`, making integration with Angular signals-based components effortless.
- Consider adding `@ngrx/store-devtools` to the `app.config.ts` providers in development for easier debugging.
- If you prefer to use `toSignal()` from `@angular/core/rxjs`, that remains supported; `@ngrx/signals` provides a convenient `selectSignal()` helper for tighter integration.
