import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Component, ElementRef, OnInit, ViewChild, inject} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CommonService} from "src/app/Services/common.service";
import {StorageService} from "src/app/Services/storage.service";
import {ToastService} from "src/app/toast-service/toast-container.service";
import {FieldConfig} from "../../../shared-fields/WidthConfig";
import {BuildFieldComponent} from "../build-field/build-field.component";
import * as Fieldsarray from "./Field-toolbar-layout.json";

@Component({
    selector: "app-build-canvas",
    templateUrl: "./build-canvas.component.html",
    styleUrls: ["./build-canvas.component.scss"],
    providers: [FieldConfig],
})
export class BuildCanvasComponent implements OnInit {
    @ViewChild("focusinput") focusInput: ElementRef;
    Fieldsarray: Array<{label: string; icon: any; field: any}> = (Fieldsarray as any).default;
    StructuredFieldArray: Array<any>;
    FormArrays = ["phone", "email"];
    FormGroups = ["currency", "checkbox"];
    activeIndex: number = 0;
    maxTabs: number = 12;
    activeEditTab: number = -1;
    activeEditField: number = 0;
    col_size: number[] = [0];
    uid: string = "";
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

    config = inject(FieldConfig);
    modalService = inject(NgbModal);
    notifyservice = inject(ToastService);
    route = inject(Router);
    storage = inject(StorageService);
    service = inject(CommonService);

    constructor() {
        this.uid = localStorage.getItem("uid");
    }
    ngOnInit(): void {
        this.StructuredFieldArray = this.Fieldsarray.map((item) => item.field);
        this.service.getFormSchema().subscribe({
            next: (res) => {
                res && (this.Basic_Layout = res[this.uid]);
                // this.col_size = [0, 1, 2];
            },
            error: (err) => {
                this.notifyservice.showToasterMsg({message: "Error submitting form", type: "fail"});
                console.error(err);
            },
        });
    }

    Array(index: number) {
        return index !== undefined ? Array(index + 1) : [];
    }

    MaxColSize: number = Object.keys(this.config.colWidthConfig).length;
    editTabControl: FormControl = new FormControl("");
    ActivefieldControl: FormControl = new FormControl("");

    addTab(index: number) {
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
            this.StructuredFieldArray.splice(event.previousIndex, 0, event.previousContainer.data[event.previousIndex]);
            this.openFieldSettings(event.previousContainer.data[event.previousIndex]);
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    deleteField(item: any, index: number) {
        console.log(item, index);

        item.splice(index, 1);
    }

    setColumnConfig(tabindex: number, colindex: number) {
        this.col_size[tabindex] <= colindex ?
            Array(colindex - this.col_size[tabindex])
                .fill(0)
                .forEach((_, i) =>
                    this.Basic_Layout.tabs[tabindex].columns.push({
                        seq: i,
                        fields: [],
                    })
                )
        :   Array(this.col_size[tabindex] - colindex)
                .fill(0)
                .forEach((_, i) => this.Basic_Layout.tabs[tabindex].columns.pop());
        this.col_size[tabindex] = colindex;
    }

    openFieldSettings(item: any) {
        const modalRef = this.modalService.open(BuildFieldComponent, {centered: true, scrollable: true});
        modalRef.componentInstance.formInfo = item;
        modalRef.closed.subscribe(
            (res) => (
                item?.id != undefined && (item["id"] = res["id"]),
                item?.label != undefined && (item["label"] = res["label"]),
                item?.options != undefined && (item["options"] = res["options"]),
                item?.validators?.required != undefined && (item["validators"]["required"] = res["required"]),
                item?.validators?.maxLength != undefined && (item["validators"]["maxLength"] = res["maxLength"]),
                item?.validators?.minLength != undefined && (item["validators"]["minLength"] = res["minLength"]),
                item?.input != undefined && (item["input"] = res["input"]),
                item?.range != undefined && (item["range"] = res["range"]),
                item?.help != undefined && (item["help"] = res["help"]),
                item?.disabled != undefined && (item["disabled"] = res["disabled"]),
                item?.default != undefined && (item["default"] = res["default"])
            )
        );
    }

    reRouteLayout() {
        if (this.Basic_Layout.tabs.some((tab) => tab.columns.some((col) => col.fields.length))) {
            this.route.navigateByUrl("/forms");
        } else {
            this.notifyservice.showToasterMsg({message: "Please add fields to the layout before proceeding.", type: "warning"});
        }
    }

    SubmitForm() {
        const $submitApi = this.Basic_Layout ? this.service.updateFormSchema(this.Basic_Layout) : this.service.setFormSchema(this.Basic_Layout);

        $submitApi.subscribe({
            next: (res) => {
                this.notifyservice.showToasterMsg({message: "Form submitted successfully", type: "success"});
                console.log(res);
                this.route.navigateByUrl("/forms/create");
            },
            error: (err) => {
                this.notifyservice.showToasterMsg({message: "Error submitting form", type: "fail"});
                console.log(err);
            },
        });
        // this.storage.set("layout_schema", this.Basic_Layout);
    }
}
