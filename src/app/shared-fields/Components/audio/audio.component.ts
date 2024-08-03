import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, ControlContainer, AbstractControl, FormControl} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: "app-audio",
    templateUrl: "./audio.component.html",
    styleUrls: ["./audio.component.scss"],
})
export class AudioComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    url: string;
    errorMsg: string;
    recording: boolean = false;

    constructor(
        public controlContainer: ControlContainer,
        private domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormControl;
    }

    sanitize(url: string) {
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
}
