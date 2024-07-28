import { Component, OnInit, inject } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { CustomValidators } from "src/app/Custom-validators/components/custom-validators";
import { CommonService } from "src/app/Services/common.service";
import { StorageService } from "src/app/Services/storage.service";
import { FieldConfig } from "../../shared-fields/WidthConfig";
import { FieldDependencyService } from "../field-dependency.service";
import { FieldModel } from "./field.model";
import { ToastService } from "src/app/toast-service/toast-container.service";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
    formGroup: FormGroup = new FormGroup({});
    Layout_Schema: { schema_id: string; data: { tabs: Array<{ seq: number; label: string; columns: Array<{ seq: number; fields: Array<FieldModel> }> }> } };
    mode: "edit" | "list" = "edit";
    FormArrays: string[] = ["phone", "email"];
    FormGroups: string[] = ["currency", "checkbox"];
    activeIndex: number = 0;
    dependencyservice = inject(FieldDependencyService);
    nfb = inject(NonNullableFormBuilder);
    config = inject(FieldConfig);
    storage = inject(StorageService);
    service = inject(CommonService);
    notifyservice = inject(ToastService);

    ngOnInit(): void {
        this.service.getFormSchema().subscribe({
            next: (res) => {
                this.Layout_Schema = { schema_id: Object.keys(res)[0], data: Object.values(res)[0] };

                this.initializeForm();
            },
            error: (err) => {
                this.notifyservice.showToasterMsg({ message: "Error loading form", type: "fail" });
                console.error(err);
            },
        });
    }
    initializeForm(): void {
        let templisting = [];
        this.Layout_Schema && this.Layout_Schema.data.tabs.forEach((col, i) => this.Layout_Schema.data.tabs[i].columns.forEach((fl) => fl.fields.forEach((el) => templisting.push(el))));

        templisting.length &&
            templisting.forEach((elm: { [x: string]: any }) => {
                //for formArrays
                if (this.FormArrays.includes(elm["type"])) {
                    this.formGroup.setControl(elm["id"], this.nfb.array([]));
                }
                //form formGroups
                else if (this.FormGroups.includes(elm["type"])) {
                    this.formGroup.setControl(elm["id"], this.nfb.group(this.formGroupValueAssign(elm), { validators: this.Validation(elm["validators"]) }));
                    //for formControls
                } else {
                    this.formGroup.setControl(elm["id"], this.nfb.control({ value: elm["default"], disabled: !elm["input"] }, { validators: this.Validation(elm["validators"]) }));
                }

                elm["dependencies"] && this.dependencyservice.dependencyInjection(this.formGroup, templisting, elm);
            });
    }

    formGroupValueAssign(elm) {
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
        this.formGroup.markAllAsTouched();
        this.formGroup.valid &&
            // this.storage.get("listing").then((res) => {
            //     res.push(this.formGroup.value);
            //     console.log(res, this.formGroup.value);
            //     this.storage.set("listing", res ? res : []);
            // });

            this.service.saveDataSource(this.formGroup.value).subscribe({
                next: (res) => {
                    this.notifyservice.showToasterMsg({ message: "Form submitted successfully", type: "success" });
                    console.log(res);
                    this.formGroup.reset();
                },
                error: (err) => {
                    this.notifyservice.showToasterMsg({ message: "Error saving form", type: "fail" });
                    console.error(err);
                },
            });

        console.log(this.formGroup.value);
        // this.storage.set("layout_schema", this.Layout_Schema);
        // this.formGroup.reset();
    }
}
