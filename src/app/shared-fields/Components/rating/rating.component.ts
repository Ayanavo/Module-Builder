import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl, ControlContainer, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: "app-rating",
    templateUrl: "./rating.component.html",
    styleUrls: ["./rating.component.scss"],
})
export class RatingComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    customRate: number;

    constructor(public controlContainer: ControlContainer) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
        this.customRate = this.ControlAccess["default"] * this.ControlAccess["range"];
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }

    getFractionalValue() {
        setTimeout(() => this.FieldControl.setValue(this.customRate / this.ControlAccess["range"]));
    }
}
