import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl, ControlContainer, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: "app-formula",
    templateUrl: "./formula.component.html",
    styleUrls: ["./formula.component.scss"],
})
export class FormulaComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;

    constructor(public controlContainer: ControlContainer) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }
}
