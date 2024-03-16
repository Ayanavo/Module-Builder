import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { CustomValidators } from "src/app/Custom-validators/components/custom-validators";
import { FieldDependencyService } from "../field-dependency.service";
import * as layoutJson from "./layout(final).json";
import { FieldConfig } from "../../shared-fields/WidthConfig";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
    formGroup: FormGroup = new FormGroup({});
    Layout_Schema = layoutJson.default;
    FormArrays: string[] = ["phone", "email"];
    FormGroups: string[] = ["currency", "checkbox"];
    activeIndex: number = 0;

    constructor(private service: FieldDependencyService, private nfb: NonNullableFormBuilder, public config: FieldConfig) {}

    ngOnInit(): void {
        this.Layout_Schema = JSON.parse(localStorage.getItem("layout_schema"));

        let templisting = [];
        this.Layout_Schema.tabs.forEach((col, i) => {
            this.Layout_Schema.tabs[i].columns.forEach((fl) => {
                fl.fields.forEach((el) => {
                    templisting.push(el);
                });
            });
        });

        templisting.forEach((elm: { [x: string]: any }) => {
            //for formArrays
            if (this.FormArrays.includes(elm["type"])) {
                this.formGroup.setControl(elm["id"], this.nfb.array([]));
            }
            //form formGroups
            else if (this.FormGroups.includes(elm["type"])) {
                this.formGroup.setControl(elm["id"], this.nfb.group(this.formGroupBuild(elm), { validators: this.Validation(elm["validators"]) }));
                //for formControls
            } else {
                this.formGroup.setControl(elm["id"], this.nfb.control({ value: elm["default"], disabled: !elm["input"] }, { validators: this.Validation(elm["validators"]) }));
            }

            elm["dependencies"] && this.service.dependencyInjection(this.formGroup, templisting, elm);
        });
    }

    formGroupBuild(elm) {
        switch (elm["type"]) {
            case "checkbox":
                return elm["options"].reduce((result: { string: boolean }, ctrl: string, index: number) => {
                    result[ctrl] = !!elm["default"][index];
                    return result;
                }, {});
            case "currency":
                return {};
        }
        return null;
    }

    Validation(validators: { required: any; maxLength: number; minLength: number; email: any; requiredcheckbox: any }): ValidatorFn[] {
        let validatorArr = [];
        validators?.required && validatorArr.push(Validators.required),
            validators?.maxLength && validatorArr.push(Validators.maxLength(validators.maxLength)),
            validators?.minLength && validatorArr.push(Validators.minLength(validators.minLength)),
            validators?.requiredcheckbox && validatorArr.push(CustomValidators.atLeastOneRequired);
        return validatorArr;
    }

    onSubmit() {
        //    alert(JSON.stringify(this.formGroup.value));
        this.formGroup.markAllAsTouched();
        console.log(this.formGroup);

        // this.formGroup.reset();
    }
}
