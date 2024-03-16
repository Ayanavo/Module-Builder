import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ToastServiceService } from "src/app/toast-service.service";
import { FieldConfig } from "../../../shared-fields/WidthConfig";
import * as Fieldsarray from "./Field-toolbar-layout.json";

@Component({
    selector: "app-build-canvas",
    templateUrl: "./build-canvas.component.html",
    styleUrls: ["./build-canvas.component.scss"],
    providers: [FieldConfig],
})
export class BuildCanvasComponent {
    constructor(public config: FieldConfig, private notifyservice: ToastServiceService) {
        this.StructuredFieldArray = this.Fieldsarray.map((item) => item.field);
    }

    @ViewChild("focusinput") focusInput: ElementRef;
    @ViewChild("focusfieldinput") focusfieldInput: ElementRef;
    Fieldsarray: Array<{ label: string; icon: any; field: any }> = Fieldsarray.default;
    StructuredFieldArray: Array<any>;
    FormArrays: string[] = ["phone", "email"];
    FormGroups: string[] = ["currency", "checkbox"];
    activeIndex: number = 0;
    maxTabs: number = 12;
    activeEditTab: number = -1;
    activeEditField: number = 0;
    col_size: number[] = [1];
    Basic_Layout: any = {
        tabs: [
            {
                seq: 0,
                label: "Tab 1",
                columns: [
                    {
                        seq: 0,
                        fields: [],
                    },
                ],
            },
        ],
    };

    MaxColSize: number = Object.keys(this.config.colWidthConfig).length;
    editTabControl: FormControl = new FormControl("");
    ActivefieldControl: FormControl = new FormControl("");

    addTab(index) {
        this.Basic_Layout.tabs.push({
            seq: index,
            label: `Tab ${index + 1}`,
            columns: [
                {
                    seq: 0,
                    fields: [],
                },
            ],
        });
        this.col_size.push(1);
    }

    removeTab(index: number) {
        this.Basic_Layout.tabs.splice(index, 1);
    }

    editTab(index: number) {
        this.activeEditTab = index;
        this.editTabControl.setValue(this.Basic_Layout.tabs[index].label);
        setTimeout(() => this.focusInput && this.focusInput.nativeElement.focus());
    }

    saveTab(index: number) {
        this.Basic_Layout.tabs[index].label = this.editTabControl.value;
        this.activeEditTab = -1;
    }

    ondrop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            this.activeEditField = event.currentIndex;
            setTimeout(() => this.focusfieldInput && this.focusfieldInput.nativeElement.focus());
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    saveField(editField: any) {
        this.ActivefieldControl.value && ((editField["label"] = this.ActivefieldControl.value), (editField["id"] = this.ActivefieldControl.value.trim().replace(" ", "_").toLowerCase()));
    }
    deleteField(item: any, index: number) {
        item.splice(index, 1);
    }

    setColumnConfig(tabindex: number, colindex: number) {
        this.col_size[tabindex] = colindex + 1;
        Array(this.col_size[tabindex])
            .fill(0)
            .forEach(
                (_, i) =>
                    (this.Basic_Layout.tabs[tabindex].columns[i] = {
                        seq: i,
                        fields: [],
                    })
            );
    }

    SubmitForm() {
        this.notifyservice.showToasterMsg("Form Saved Succesfully", "success");
        localStorage.setItem("layout_schema", JSON.stringify(this.Basic_Layout));
    }
}
