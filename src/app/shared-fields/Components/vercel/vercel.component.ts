import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, ControlContainer, FormControl, FormGroup } from "@angular/forms";
import { FieldDependencyService } from "../../../Layout/field-dependency.service";
import { StorageService } from "src/app/Services/storage.service";
import * as VercelOption from "./vercel.model";

@Component({
    selector: "app-vercel",
    templateUrl: "./vercel.component.html",
    styleUrls: ["./vercel.component.scss"],
    providers: [FieldDependencyService],
})
export class VercelComponent implements OnInit {
    @Input() ControlAccess: { id: string; type: string; options: VercelOption.VercelOption };
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    activeVercelId: string;

    constructor(public controlContainer: ControlContainer, private service: FieldDependencyService, private storage: StorageService) {}

    ngOnInit() {
        this.storage.get("vrclId").then((res) => (this.activeVercelId = res));
        this.FormGroup = this.controlContainer.control as FormGroup;
        this.FieldControl.setValue(this.ControlAccess.options.find((item) => this.activeVercelId == item["id"]));
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }

    _compareFn(idFist, idSecond) {
        return idFist && idSecond ? idFist.id === idSecond.id : idFist === idSecond;
    }

    onCheckbox(evt) {
        evt.target.checked && this.FieldControl.value["id"] && (this.storage.set("vrclId", this.FieldControl.value["id"]), (this.activeVercelId = this.FieldControl.value["id"]));
    }
}
