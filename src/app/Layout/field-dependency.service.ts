import {Injectable} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class FieldDependencyService {
    constructor() {}

    dependencyInjection(formgroup, schema, formschema) {
        (formgroup.get(formschema["id"]) as FormControl).valueChanges.subscribe((val) => {
            formschema["dependencies"].forEach((field) => {
                let targetschema = schema.find((f: any) => f["id"] === field["field_id"]);
                let dependant = formgroup.get(field["field_id"]);

                switch (field["field_action"]) {
                    case "deactive":
                        val ? Object.assign(targetschema, {active: true}) : Object.assign(targetschema, {active: false});
                        break;
                    case "disabled":
                        !val ? dependant.disable() : dependant.enable();
                        break;
                    case "demanded":
                        let control = dependant as FormControl;

                        if (targetschema.validators?.["required"] === undefined) {
                            return;
                        }
                        !val ? control.setValidators(Validators.required) : control.setValidators(null), control.updateValueAndValidity();
                        !val ? (targetschema.validators = {required: true}) : (targetschema.validators = {required: false});
                }
            });
        });
    }
}
