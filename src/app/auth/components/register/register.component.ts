import {Component, OnDestroy, inject} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FirebaseError} from "firebase/app";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth.service";
import {CustomValidators} from "src/app/Custom-validators/components/custom-validators";
import {ToastService} from "src/app/toast-service/toast-container.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnDestroy {
    router = inject(Router);
    service = inject(AuthService);
    notifyservice = inject(ToastService);
    subscription: Subscription;

    toggle: boolean = false;

    SigninForm: FormGroup = new FormGroup(
        {
            username: new FormControl<string>("", Validators.required),
            email: new FormControl<string>("", [Validators.email, Validators.required]),
            password: new FormControl<string>("", [Validators.required, Validators.minLength(8)]),
            cnfpassword: new FormControl<string>("", [Validators.required, Validators.minLength(8)]),
        },
        CustomValidators.PatternMatch("password", "cnfpassword")
    );

    toggleVisual() {
        this.toggle = !this.toggle;
    }

    onSubmit() {
        this.SigninForm.markAllAsTouched();
        if (this.SigninForm.valid) {
            this.subscription = this.service.RegisterUser(this.SigninForm.value).subscribe({
                next: () => {
                    this.notifyservice.showToasterMsg({message: "Logged in successfully", type: "success"});
                    this.router.navigate(["auth/login"]);
                },
                error: (err: FirebaseError) => {
                    this.notifyservice.showToasterMsg({message: err.code + " " + err.message, type: "fail"});
                    console.log(err.message);
                },
            });
        }
    }

    get FieldControlUser() {
        return this.SigninForm.get("username") as FormControl;
    }

    get FieldControlPass() {
        return this.SigninForm.get("password") as FormControl;
    }

    get FieldControlEmail() {
        return this.SigninForm.get("email") as FormControl;
    }

    ngOnDestroy(): void {
        this.subscription && this.subscription.unsubscribe();
    }
}
