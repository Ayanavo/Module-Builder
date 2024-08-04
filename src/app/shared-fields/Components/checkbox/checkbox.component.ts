import {Component, Input, OnInit} from "@angular/core";
import {ControlContainer, FormGroup} from "@angular/forms";

@Component({
    selector: "app-checkbox",
    templateUrl: "./checkbox.component.html",
    styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    constructor(public controlContainer: ControlContainer) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
    }

    get FieldControl(): FormGroup {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormGroup;
    }

    get displayData() {
        return Object.keys(this.FieldControl.value).filter((key) => this.FieldControl.value[key]);
    }
}
