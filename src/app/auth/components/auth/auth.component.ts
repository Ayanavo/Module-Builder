import { Component, OnDestroy, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FirebaseError } from "firebase/app";
import { Subscription } from "rxjs";
import { AuthService } from "../../auth.service";
import { ToastService } from "src/app/toast-service/toast-container.service";
import { UserCredential } from "firebase/auth";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnDestroy {
    router = inject(Router);
    service = inject(AuthService);
    notifyservice = inject(ToastService);
    subscription: Subscription;
    toggle: boolean = false;

    loginform: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.email, Validators.required]),
        password: new FormControl("", Validators.required),
    });

    toggleVisual() {
        this.toggle = !this.toggle;
    }

    onSubmit() {
        this.loginform.markAllAsTouched();
        if (this.loginform.valid) {
            this.subscription = this.service.LogIn(this.loginform.value).subscribe({
                next: (res: UserCredential) => {
                    res.user.getIdToken(false).then((res) => localStorage.setItem("access_token", res));
                    this.notifyservice.showToasterMsg({ message: "Logged in successfully", type: "success" });
                    this.router.navigateByUrl("/table-listing");
                },
                error: (err: FirebaseError) => {
                    this.notifyservice.showToasterMsg({ message: err.code + " Logged in failed", type: "fail" });
                },
            });
        }
    }

    authAnonymous(){
      this.service.GuestLogin().subscribe({
          next: (res: UserCredential) => {
            res.user.getIdToken(false).then((res) => localStorage.setItem("access_token", res));
              this.notifyservice.showToasterMsg({ message: "Logged in as Guest", type: "success" });
              this.router.navigateByUrl("/table-listing");
          },
          error: (err: FirebaseError) => {
              this.notifyservice.showToasterMsg({ message: err.code + "Logged in failed", type: "fail" });
              console.log(err.message);
          },
      });
    }

    authProvider(providername: string) {
        this.service.setAuthProvider(providername).subscribe({
            next: (res: UserCredential) => {
              res.user.getIdToken(false).then((res) => localStorage.setItem("access_token", res));
                this.notifyservice.showToasterMsg({ message: "Logged in successfully", type: "success" });
                this.router.navigateByUrl("/table-listing");
            },
            error: (err: FirebaseError) => {
                this.notifyservice.showToasterMsg({ message: err.code + "Logged in failed", type: "fail" });
                console.log(err.message);
            },
        });
    }

    get FieldControlPass() {
        return this.loginform.get("password") as FormControl;
    }

    get FieldControlEmail() {
        return this.loginform.get("email") as FormControl;
    }

    ngOnDestroy(): void {
        this.subscription && this.subscription.unsubscribe();
    }
}
