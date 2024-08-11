import {Component, inject, Input, OnInit} from "@angular/core";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbCalendar, NgbDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {CustomValidators} from "src/app/Custom-validators/components/custom-validators";

@Component({
    selector: "build-field",
    templateUrl: "./build-field.component.html",
    styleUrls: ["./build-field.component.scss"],
})
export class BuildFieldComponent implements OnInit {
    maxAllowedLimit: number = 237;
    minAllowedLimit: number = 0;
    CustomOptions: FormGroup = new FormGroup({});
    @Input() formInfo: any;
    // @ViewChild("select") select: ElementRef<HTMLSelectElement>;
    isFormReady: boolean = false;
    dateformatter = "dd/mm/yyyy";
    CustomNavConfig: Array<{label: string; ngbDate: number}> = [
        {label: "Today", ngbDate: 0},
        {label: "Yesterday", ngbDate: -1},
        {label: "Tomorrow", ngbDate: 1},
        {label: "Next Week", ngbDate: 7},
        {label: "2 Weeks", ngbDate: 14},
        {label: "4 Weeks", ngbDate: 28},
        {label: "8 Weeks", ngbDate: 56},
        {label: "Previous Week", ngbDate: -7},
    ];

    calendar = inject(NgbCalendar);
    activeModal = inject(NgbActiveModal);

    ngOnInit(): void {
        setTimeout(() => {
            this.CustomOptions.addControl("id", new FormControl({value: this.formInfo?.label.trim().toLowerCase().replaceAll(" ", "_"), disabled: true}));
            this.CustomOptions.addControl("label", new FormControl(this.formInfo?.label, {validators: Validators.required}));
            this.CustomOptions.addControl("help", new FormControl(this.formInfo?.help ? this.formInfo["help"] : ""));
            this.CustomOptions.addControl("default", new FormControl(this.formInfo?.default != undefined ? this.formInfo["default"] : null, {validators: this.DefaultFieldValidator}));
            this.CustomOptions.addControl("required", new FormControl(this.formInfo?.validators?.required != undefined ? this.formInfo["validators"]["required"] : false));
            this.CustomOptions.addControl("disabled", new FormControl(this.formInfo?.disabled != undefined ? this.formInfo["disabled"] : false));
            this.CustomOptions.addControl("input", new FormControl(this.formInfo?.input != undefined ? this.formInfo["input"] : false));
            ["text", "textarea"].includes(this.formInfo?.type) &&
                this.formInfo?.validators != undefined &&
                this.CustomOptions.addControl("maxLength", new FormControl(this.formInfo["validators"]["maxLength"] ? this.formInfo["validators"]["maxLength"] : this.maxAllowedLimit));
            ["text", "textarea"].includes(this.formInfo?.type) &&
                this.formInfo?.validators != undefined &&
                this.CustomOptions.addControl("minLength", new FormControl(this.formInfo["validators"]["minLength"] ? this.formInfo["validators"]["minLength"] : this.minAllowedLimit));
            this.formInfo?.range != undefined && this.CustomOptions.addControl("range", new FormControl(this.formInfo["range"] ? this.formInfo["range"] : 0, {validators: CustomValidators.RangeValidator}));
            this.formInfo?.symbol != undefined && this.CustomOptions.addControl("symbol", new FormControl(this.formInfo["symbol"] ? this.formInfo["symbol"] : "", Validators.required));
            this.formInfo?.rangecolor != undefined && this.CustomOptions.addControl("rangecolor", new FormControl(this.formInfo["rangecolor"] ? this.formInfo["rangecolor"] : ""));
            this.formInfo?.embedurl != undefined && this.CustomOptions.addControl("embedurl", new FormControl(this.formInfo["embedurl"] ? this.formInfo["embedurl"] : ""));
            this.formInfo?.options && this.CustomOptions.addControl("shuffle", new FormControl(this.formInfo["shuffle"] ? this.formInfo["shuffle"] : ""));
            this.formInfo?.options && this.CustomOptions.addControl("options", new FormArray([]));

            this.formInfo?.options &&
                (this.formInfo?.options?.length ?
                    this.formInfo["options"].forEach((value) => {
                        this.FieldControl.push(new FormControl(value, {validators: [Validators.required, Validators.maxLength(100)]}));
                    })
                :   this.FieldControl.push(this.createElement));

            this.isFormReady = true;
            this.CustomOptions.get("label").valueChanges.subscribe((val) => this.CustomOptions.get("id").setValue(val.trim().toLowerCase().replaceAll(" ", "_")));
        });
    }

    get FieldControl(): FormArray {
        return this.CustomOptions.get("options") as FormArray;
    }

    get createElement(): FormControl {
        return new FormControl("", {validators: [Validators.required, Validators.maxLength(100)]});
    }

    get DefaultFieldValidator() {
        let validatorsArray: any[] = [];
        validatorsArray.push(Validators.maxLength(100));
        this.formInfo.type == "email" && validatorsArray.push(Validators.email);
        this.formInfo.type == "phone" && validatorsArray.push(CustomValidators.PhoneformatMatch);
        return validatorsArray;
    }

    navigate(datepicker: NgbDatepicker, number: number) {
        this.CustomOptions.get("default").setValue(this.calendar.getNext(this.calendar.getToday(), "d", number));
        datepicker.navigateTo(this.CustomOptions.value["default"]);
    }

    onSubmit() {
        this.CustomOptions.valid && this.activeModal.close(this.CustomOptions.getRawValue());
    }
}
