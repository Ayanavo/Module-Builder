import {Component, Input, OnInit} from "@angular/core";
import {ControlContainer, FormGroup} from "@angular/forms";

@Component({
    selector: "app-radio",
    templateUrl: "./radio.component.html",
    styleUrls: ["./radio.component.scss"],
})
export class RadioComponent implements OnInit {
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
}
