import { Component, HostListener, Input } from "@angular/core";
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-email",
    templateUrl: "./email.component.html",
    styleUrls: ["./email.component.scss"],
})
export class EmailComponent {
    @Input() ControlAccess: { id: string; validators: Object | null };
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    defaultIsd = "+91";

    constructor(public controlContainer: ControlContainer, private fb: FormBuilder) {}
    @HostListener("window:submit") onSubmit() {
        this.FormGroup.valid && this.resetForm;
    }

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
        this.FieldControl.push(this.createElement);
    }
    get createElement(): FormGroup {
        return this.fb.group({
            email: [null, this.EmailValidators],
        });
    }

    get EmailValidators() {
        let Validarr = [];
        Validarr.push(Validators.email);
        this.ControlAccess.validators?.["required"] && Validarr.push(Validators.required);
        return Validarr;
    }

    get FieldControl(): FormArray {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormArray;
    }

    EmailControl(i) {
        return (this.FieldControl.at(i) as FormGroup).get("email") as FormControl;
    }

    get resetForm() {
        this.FieldControl.clear();
        this.FieldControl.push(this.createElement);
        return;
    }
}
