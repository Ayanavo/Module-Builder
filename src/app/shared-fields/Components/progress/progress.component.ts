import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, ControlContainer, AbstractControl} from "@angular/forms";
import {FieldDependencyService} from "src/app/Layout/field-dependency.service";

@Component({
    selector: "app-progress",
    templateUrl: "./progress.component.html",
    styleUrls: ["./progress.component.scss"],
})
export class ProgressComponent implements OnInit {
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

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormGroup;
    }
}
