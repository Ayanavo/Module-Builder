import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormControl, FormGroup } from "@angular/forms";
import { FieldDependencyService } from "../../../Layout/field-dependency.service";

@Component({
    selector: "app-boolean",
    templateUrl: "./boolean.component.html",
    styleUrls: ["./boolean.component.css"],
    providers: [FieldDependencyService],
})
export class BooleanComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    constructor(public controlContainer: ControlContainer, private service: FieldDependencyService) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
        //this.ControlAccess["dependencies"] && this.service.dependencyInjection(this.FormGroup, this.ControlAccess);
    }

    get FieldControl(): FormControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }
}
