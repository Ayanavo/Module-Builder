import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, ControlContainer, AbstractControl, FormControl} from "@angular/forms";
import {FieldDependencyService} from "src/app/Layout/field-dependency.service";

@Component({
    selector: "app-multilist",
    templateUrl: "./multilist.component.html",
    styleUrl: "./multilist.component.scss",
    providers: [FieldDependencyService],
})
export class MultilistComponent implements OnInit {
    @Input() ControlAccess: {id: string; type: string; options: string[]};
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
        !this.FieldControl.value && this.FieldControl.setValue([]);
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }

    getSelection(item: string) {
        if (!this.SelectedItems.some((alteritem: string) => alteritem == item)) {
            this.SelectedItems.push(item);
            this.FieldControl.setValue(this.SelectedItems);
            this.SelectedItems.length == this.ControlAccess.options.length && (this.active = false);
        } else {
            this.removeSelected(item);
        }
    }

    selectAll() {
        this.SelectedItems.length == this.ControlAccess.options.length && (this.active = false);
        this.active ? (this.SelectedItems = JSON.parse(JSON.stringify(this.ControlAccess.options))) : (this.SelectedItems = []);
        this.FieldControl.setValue(this.SelectedItems);
    }

    removeSelected(item: string) {
        this.SelectedItems.splice(this.SelectedItems.indexOf(item), 1);
        this.FieldControl.setValue(this.SelectedItems);
    }
}
