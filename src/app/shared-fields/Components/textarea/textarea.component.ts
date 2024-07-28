import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";

@Component({
    selector: "app-textarea",
    templateUrl: "./textarea.component.html",
    styleUrls: ["./textarea.component.css"],
})
export class TextareaComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    constructor(public controlContainer: ControlContainer) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormGroup;
    }
}
