import { Component, Input, OnInit, Sanitizer, ViewChild } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import "quill-mention";
import { QuillEditorComponent } from "ngx-quill";
import { FieldConfig } from "../../WidthConfig";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    quillUndoIcon: any;
    quillRedoIcon: any;
    constructor(public controlContainer: ControlContainer, public sanitizer: DomSanitizer, public config: FieldConfig) {
        // const icons = Quill.import("ui/icons");
        // icons["undo"] = this.quillUndoIcon;
        // icons["redo"] = this.quillRedoIcon;
    }
    @ViewChild(QuillEditorComponent, { static: true }) editor: QuillEditorComponent;
    @ViewChild("quill") quill;

    modules = {
        mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            onSelect: (item, insertItem) => {
                const editor = this.editor.quillEditor;
                insertItem(item);
                // necessary because quill-mention triggers changes as 'api' instead of 'user'
                editor.insertText(editor.getLength() - 1, "", "user");
            },
            source: (searchTerm, renderList) => {
                const values = [
                    { id: 1, value: "Fredrik Sundqvist" },
                    { id: 2, value: "Patrik Sjölin" },
                ];

                if (searchTerm.length === 0) {
                    renderList(values, searchTerm);
                } else {
                    const matches = [];
                    values.forEach((entry) => {
                        if (entry.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                            matches.push(entry);
                        }
                    });
                    renderList(matches, searchTerm);
                }
            },
        },
    };
    editorStyle = {
        margin: "0px",
        width: "100rem",
        height: "200px",
    };

    redo() {
        this.quill.history.redo();
    }
    undo() {
        this.quill.history.undo();
    }

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
    }

    get FieldControl(): FormGroup {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormGroup;
    }

    get SanitizedHTML() {
        return this.sanitizer.bypassSecurityTrustHtml(this.FieldControl.value);
    }
}
