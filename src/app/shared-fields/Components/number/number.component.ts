import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl, ControlContainer, FormGroup} from "@angular/forms";
import {FieldDependencyService} from "../../../Layout/field-dependency.service";
@Component({
    selector: "app-number",
    templateUrl: "./number.component.html",
    styleUrls: ["./number.component.scss"],
    providers: [FieldDependencyService],
})
export class NumberComponent implements OnInit {
    @Input() ControlAccess: Object;
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

    validateNo(e): boolean {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormGroup;
    }
}
