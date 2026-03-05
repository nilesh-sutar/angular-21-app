import { inject } from "@angular/core";
import { AuthStore } from "./store/auth.store";

export function initApp() {
    const authStore = inject(AuthStore);
    return () => authStore.init();
}