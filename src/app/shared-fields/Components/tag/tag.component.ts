import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, ControlContainer, AbstractControl, FormControl} from "@angular/forms";
import {FieldDependencyService} from "src/app/Layout/field-dependency.service";

@Component({
    selector: "app-tag",
    templateUrl: "./tag.component.html",
    styleUrls: ["./tag.component.scss"],
})
export class TagComponent implements OnInit {
    @Input() ControlAccess: {id: string; options: string[]};
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    SelectedItems: Array<string> = [];
    active: boolean = false;
    constructor(
        public controlContainer: ControlContainer,
        private service: FieldDependencyService
    ) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
        this.SelectedItems = this.FieldControl.value;
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }

    getSelection(item: string) {
        if (!this.SelectedItems.some((alteritem: string) => alteritem == item)) {
            this.SelectedItems.push(item);
            this.FieldControl.setValue(this.SelectedItems);
        } else {
            this.removeSelected(item);
        }
    }

    selectAll(active) {
        this.SelectedItems.length == this.ControlAccess.options.length && (active = false);
        active ? (this.SelectedItems = this.ControlAccess.options) : (this.SelectedItems = []);
        this.FieldControl.setValue(this.SelectedItems);
    }

    removeSelected(item: string) {
        this.SelectedItems.splice(this.SelectedItems.indexOf(item), 1);
        this.FieldControl.setValue(this.SelectedItems);
    }
}
