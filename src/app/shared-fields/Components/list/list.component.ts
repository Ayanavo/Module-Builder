import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl, ControlContainer, FormControl, FormGroup} from "@angular/forms";
import {FieldDependencyService} from "../../../Layout/field-dependency.service";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"],
    providers: [FieldDependencyService],
})
export class ListComponent implements OnInit {
    @Input() ControlAccess: {id: string; type: string; options: string[]};
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    constructor(
        public controlContainer: ControlContainer,
        private service: FieldDependencyService
    ) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
        //  this.ControlAccess["dependencies"] && this.service.dependencyInjection(this.FormGroup, this.ControlAccess);
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }

    toggleSelection(arg0: any) {
        console.log(arg0);
    }
}
