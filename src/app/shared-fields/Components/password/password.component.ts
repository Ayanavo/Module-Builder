import { Component, HostListener, Input, OnInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "src/app/Custom-validators/components/custom-validators";

@Component({
    selector: "app-password",
    templateUrl: "./password.component.html",
    styleUrls: ["./password.component.scss"],
})
export class PasswordComponent implements OnInit {
    @Input() ControlAccess: { id: string; label: string; validators: any };
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    Password_Config: { label: string; identifier: string }[];
    PasswordForm: FormGroup<any> = new FormGroup({});

    constructor(public controlContainer: ControlContainer) {}

    ngOnInit() {
        this.Password_Config = [
            { label: this.ControlAccess.label, identifier: "nwd" },
            { label: "Confirm " + this.ControlAccess.label, identifier: "cwp" },
        ];
        this.FormGroup = this.controlContainer.control as FormGroup;
        this.Password_Config.forEach((x) => this.PasswordForm.addControl(x["identifier"], new FormControl("", this.ControlAccess.validators?.["required"] && Validators.required)));
        this.PasswordForm.addValidators(CustomValidators.PatternMatch("nwp", "cwp"));
        this.PasswordForm.updateValueAndValidity();
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormGroup;
    }

    @HostListener("window:submit")
    onSubmit() {
        this.PasswordForm.markAllAsTouched();
        this.PasswordForm.valid && this.FieldControl.setValue(this.PasswordForm.value.nwp);
    }
}
