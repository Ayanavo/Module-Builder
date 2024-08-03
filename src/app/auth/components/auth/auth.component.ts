import {Component, inject, OnDestroy} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FirebaseError} from "firebase/app";
import {UserCredential} from "firebase/auth";
import {debounceTime, Subscription, switchMap} from "rxjs";
import {ToastService} from "src/app/toast-service/toast-container.service";
import {AuthService} from "../../auth.service";

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
            this.subscription = this.service
                .LogIn(this.loginform.value)
                .pipe(
                    debounceTime(300),
                    switchMap(async (x) => x)
                )
                .subscribe({
                    next: (res: UserCredential) => {
                        res.user.getIdToken(false).then((res) => localStorage.setItem("access_token", res));
                        res.user?.uid && localStorage.setItem("uid", res.user.uid);
                        this.router.navigateByUrl("/table-listing");
                        this.notifyservice.showToasterMsg({message: "Logged in successfully", type: "success"});
                    },
                    error: (err: FirebaseError) => {
                        this.notifyservice.showToasterMsg({message: err.code + " " + err.message, type: "fail"});
                    },
                });
        }
    }

    authAnonymous() {
        this.service
            .GuestLogin()
            .pipe(
                debounceTime(300),
                switchMap(async (x) => x)
            )
            .subscribe({
                next: (res: UserCredential) => {
                    res.user.getIdToken(false).then((res) => localStorage.setItem("access_token", res));
                    res.user?.uid && localStorage.setItem("uid", res.user.uid);
                    this.router.navigateByUrl("/table-listing");
                    this.notifyservice.showToasterMsg({message: "Logged in as Guest", type: "success"});
                },
                error: (err: FirebaseError) => {
                    this.notifyservice.showToasterMsg({message: err.code + " " + err.message, type: "fail"});
                    console.log(err.message);
                },
            });
    }

    authProvider(providername: string) {
        this.service
            .setAuthProvider(providername)
            .pipe(
                debounceTime(300),
                switchMap(async (x) => x)
            )
            .subscribe({
                next: (res: UserCredential) => {
                    res.user.getIdToken(false).then((res) => localStorage.setItem("access_token", res));
                    res.user?.uid && localStorage.setItem("uid", res.user.uid);
                    this.notifyservice.showToasterMsg({message: "Logged in successfully", type: "success"});
                    this.router.navigateByUrl("/table-listing");
                },
                error: (err: FirebaseError) => {
                    this.notifyservice.showToasterMsg({message: err.code + " " + err.message, type: "fail"});
                    console.log(err.message);
                },
            });
    }

    // executeImportantAction(): void {
    //     this.service.getAppChecktoken().subscribe({
    //         next(token: string) {
    //             console.log(token, "call");
    //         },
    //         error: (err: FirebaseError) => {
    //             this.notifyservice.showToasterMsg({ message: err.message + "Logged in failed", type: "fail" });
    //             console.log(err.message);
    //         },
    //     });
    // }

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
