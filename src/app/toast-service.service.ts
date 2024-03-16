import { Injectable, TemplateRef } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ToastServiceService {
    toasts = [];
    constructor() {}

    showToasterMsg(message, type?) {
        console.log(message);

        // this.toasts.push(message);
    }

    remove(toast) {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }
}
