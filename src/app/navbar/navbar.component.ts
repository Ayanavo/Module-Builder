import { Component, inject } from "@angular/core";
import { FirebaseError } from "firebase/app";
import { debounceTime, switchMap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { ToastService } from "../toast-service/toast-container.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
    authService = inject(AuthService);
    notifyservice = inject(ToastService);
    router = inject(Router);
    onLogOut() {
        this.authService
            .AuthLogout()
            .pipe(
                debounceTime(300),
                switchMap(async (x) => x)
            )
            .subscribe({
                next: () => {
                    localStorage.clear();
                    this.notifyservice.showToasterMsg({ message: "Logged out successfully", type: "success" });
                    this.router.navigateByUrl("/");
                },
                error: (err: FirebaseError) => {
                    this.notifyservice.showToasterMsg({ message: err.code + err.message, type: "fail" });
                    console.error(err.message);
                },
            });
    }
}
