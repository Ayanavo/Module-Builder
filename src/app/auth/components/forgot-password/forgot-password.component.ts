import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { debounceTime, Subscription, switchMap } from "rxjs";
import { AuthService } from "../../auth.service";
import { UserCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { ToastService } from "src/app/toast-service/toast-container.service";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent {
    subscription: Subscription;
    service = inject(AuthService);
    notifyservice = inject(ToastService);
    Emailform: FormGroup = new FormGroup({ email: new FormControl("", [Validators.email, Validators.required]) });

    onSubmit() {
        this.Emailform.markAllAsTouched();
        if (this.Emailform.valid) {
            this.service
                .ForgotPassword(this.Emailform.value["email"])
                .pipe(
                    debounceTime(300),
                    switchMap(async (x) => x)
                )
                .subscribe({
                    next: (res: UserCredential) => {
                        this.notifyservice.showToasterMsg({ message: "An email has been sent to the address", type: "success" });
                        this.Emailform.disable();
                        console.log(res);
                    },
                    error: (err: FirebaseError) => {
                        this.notifyservice.showToasterMsg({ message: err.code + " " + err.message, type: "fail" });
                    },
                });
        }
    }

    get FieldControlEmail() {
        return this.Emailform.get("email") as FormControl;
    }
}
