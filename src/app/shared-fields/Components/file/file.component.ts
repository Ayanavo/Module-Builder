import {Component, ElementRef, Input} from "@angular/core";
import {AbstractControl, ControlContainer, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: "app-file",
    templateUrl: "./file.component.html",
    styleUrls: ["./file.component.scss"],
})
export class FileComponent {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    base64StringArray: Array<string> = [];
    FileList: Array<any> = [];
    constructor(public controlContainer: ControlContainer) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
    }

    fileType = {
        jpeg: "filetype-jpg",
        pdf: "filetype-pdf",
        js: "filetype-js",
        json: "filetype-json",
        gif: "filetype-gif",
        html: "filetype-html",
        csv: "filetype-csv",
        zip: "filetype-zip",
        docx: "filetype-docx",
        txt: "filetype-txt",
        xlsx: "filetype-csv",
    };

    fileBrowserHandler(evt: Event) {
        let fileList: FileList = (evt.target as HTMLInputElement).files;
        this.convertAndSaveFile(fileList);
    }
    convertAndSaveFile(fileList: FileList) {
        fileList &&
            Array(fileList.length)
                .fill(0)
                .forEach((_, i) => {
                    this.FileList.push(fileList[i]);
                    let fileReader = new FileReader();
                    fileReader.onload = (event: any) => {
                        let base64String = event.target.result.split(",")[1];
                        this.base64StringArray[i] = base64String;
                        this.FieldControl.setValue(this.base64StringArray);
                    };
                    fileReader.readAsDataURL(fileList[i]);
                });
        console.log(this.FileList);
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }
}
