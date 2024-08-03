import {Component, HostListener, Input} from "@angular/core";
import {ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import countrycode from "./countrycode.json";
import {CustomValidators} from "src/app/Custom-validators/components/custom-validators";

@Component({
    selector: "app-phone",
    templateUrl: "./phone.component.html",
    styleUrls: ["./phone.component.scss"],
})
export class PhoneComponent {
    @Input() ControlAccess: {id: string; validators: Object | null};
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    defaultIsd = "+91";
    initialPattern = "(201)555-0123";
    IsdCode: {dial_code: any; code: any}[];

    constructor(
        public controlContainer: ControlContainer,
        private fb: FormBuilder
    ) {
        this.IsdCode = countrycode.map((cc: {dial_code: any; code: any}) => {
            return {isd: cc.dial_code, cc: cc.code};
        });
    }
    @HostListener("window:submit") onSubmit() {
        this.FormGroup.valid && this.resetForm;
    }

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
        this.FieldControl.push(this.createElement);
    }
    get createElement(): FormGroup {
        return this.fb.group({
            ccode: this.defaultIsd,
            num: [null, this.PhoneValidators],
        });
    }

    get PhoneValidators() {
        let Validarr = [];
        this.ControlAccess.validators?.["required"] && Validarr.push(Validators.required);
        this.ControlAccess.validators?.["format"] && Validarr.push(CustomValidators.PhoneformatMatch);
        return Validarr;
    }

    get FieldControl(): FormArray {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormArray;
    }

    PhoneControl(i) {
        return (this.FieldControl.at(i) as FormGroup).get("num") as FormControl;
    }

    get resetForm() {
        this.FieldControl.clear();
        this.FieldControl.push(this.createElement);
        return;
    }

    getFlagEmoji(cc) {
        return cc;
        return "&#" + (cc.charCodeAt(0) % 32) + 0x1f1e5;
    }
}
