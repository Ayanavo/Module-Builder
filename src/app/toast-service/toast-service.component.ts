import { Component, inject } from "@angular/core";
import { ToastService } from "./toast-container.service";

@Component({
    selector: "app-toasts",
    templateUrl: "./toast-service.component.html",
    styleUrl: "./toast-service.component.scss",
})
export class ToastServiceComponent {
    toastService = inject(ToastService);
    delaytime: number = 3000;
    progressValue: number = 0;

    generateProgressiveNumber() {
        const intervalId = setInterval(() => {
            this.progressValue++;
            this.progressValue >= 130 && (clearInterval(intervalId), (this.progressValue = 0));
        }, this.delaytime / 130);
    }
}
