import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";

@Component({
    selector: "app-text",
    templateUrl: "./text.component.html",
    styleUrls: ["./text.component.css"],
})
export class TextComponent implements OnInit {
    @Input() ControlAccess: { id: string; label: string; type: string; validators: Object };
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
