import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import { FieldDependencyService } from "../../../Layout/field-dependency.service";

@Component({
    selector: "app-boolean",
    templateUrl: "./boolean.component.html",
    styleUrls: ["./boolean.component.css"],
    providers: [FieldDependencyService],
})
export class BooleanComponent implements OnInit {
    @Input() ControlAccess: Object;
    FormGroup: FormGroup;
    constructor(public controlContainer: ControlContainer, private service: FieldDependencyService) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
        //this.ControlAccess["dependencies"] && this.service.dependencyInjection(this.FormGroup, this.ControlAccess);
    }
}
