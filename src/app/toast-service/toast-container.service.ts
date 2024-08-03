import {Injectable, TemplateRef} from "@angular/core";

type Toast = {
    message: string;
    type?: "success" | "fail" | "warning";
    template?: TemplateRef<any>;
};

@Injectable({
    providedIn: "root",
})
export class ToastService {
    toasts: Toast[] = [];

    showToasterMsg(message: Toast) {
        this.toasts.push(message);
    }

    remove(message: Toast) {
        this.toasts = this.toasts.filter((t) => t !== message);
    }

    clear() {
        this.toasts = [];
    }
}
