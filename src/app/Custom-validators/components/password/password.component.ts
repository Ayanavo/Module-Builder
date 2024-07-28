import { JsonPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../custom-validators";

@Component({
    selector: "ch-password",
    templateUrl: "./password.component.html",
    styleUrls: ["./password.component.css"],
    providers: [JsonPipe],
})
export class PasswordComponent implements OnInit {
    Form: FormGroup;
    constructor(private fb: FormBuilder) {
        this.Form = this.fb.group(
            {
                nwp: ["", Validators.required],
                cwp: ["", Validators.required],
            },
            { validators: CustomValidators.PatternMatch("nwp", "cwp") }
        );
    }

    ngOnInit() {
        console.log(this.Form);
    }

    getControl(name: string) {
        return this.Form.get(name) as FormControl;
    }

    OnSubmit() {
        alert(JSON.stringify(this.Form.value));
    }
}
// FormBuilder.group(controls: {
//   [key: string]: any;
// }, options: {
//   [key: string]: any;
// }): FormGroup<any>
