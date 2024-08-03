import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, ControlContainer} from "@angular/forms";

@Component({
    selector: "app-currency",
    templateUrl: "./currency.component.html",
    styleUrls: ["./currency.component.scss"],
})
export class CurrencyComponent implements OnInit {
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
