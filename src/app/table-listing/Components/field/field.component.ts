import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-field",
    templateUrl: "./field.component.html",
    styleUrls: ["./field.component.scss"],
})
export class FieldComponent implements OnInit {
    @Input() field: { label: string; id: string; type: string; options: Array<any>; validators: Object };
    @Input() data: any;
    mode: "list" | "edit" = "list";
    FormArrays: string[] = ["phone", "email"];
    FormGroups: string[] = ["currency", "checkbox"];
    FormGroup: FormGroup = new FormGroup({});

    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
        //for formArrays
        if (this.FormArrays.includes(this.field.type)) {
            this.FormGroup.addControl(this.field.id, new FormArray([]));
            this.data[this.field.id].forEach((elm) => (this.FormGroup.get(this.field.id) as FormArray).push(this.fb.group(elm)));
            //for formGroups
        } else if (this.FormGroups.includes(this.field.type)) {
            this.FormGroup.addControl(this.field.id, this.fb.group(this.data[this.field.id]));
        } else {
            this.FormGroup.addControl(this.field.id, new FormControl(this.data[this.field.id]));
        }
    }
}
