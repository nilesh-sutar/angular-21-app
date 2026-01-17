import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class NgxToasterService {
    toastr = inject(ToastrService)

    showSuccess(message: string, title?: string) {
        this.toastr.success(message, title || 'Success');
    }

    showError(message: string, title?: string) {
        this.toastr.error(message, title || 'Error');
    }

    showWarning(message: string, title?: string) {
        this.toastr.warning(message, title || 'Warning');
    }
}