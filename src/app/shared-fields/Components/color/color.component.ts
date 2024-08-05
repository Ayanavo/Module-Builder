import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, ControlContainer, FormControl} from "@angular/forms";
import {FieldDependencyService} from "src/app/Layout/field-dependency.service";

@Component({
    selector: "app-color",
    templateUrl: "./color.component.html",
    styleUrl: "./color.component.scss",
})
export class ColorComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    constructor(
        public controlContainer: ControlContainer,
        private service: FieldDependencyService
    ) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
    }

    get FieldControl(): FormControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }
}
