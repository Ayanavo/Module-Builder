import {Component, inject, Input, OnInit} from "@angular/core";
import {FormGroup, ControlContainer, AbstractControl} from "@angular/forms";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: "app-embed",
    templateUrl: "./embed.component.html",
    styleUrl: "./embed.component.scss",
})
export class EmbedComponent implements OnInit {
    @Input() ControlAccess: Object;
    @Input() mode: "edit" | "list";
    FormGroup: FormGroup;
    controlContainer = inject(ControlContainer);
    sanitize = inject(DomSanitizer);

    ngOnInit() {
        this.FormGroup = this.controlContainer.control as FormGroup;
    }

    get FieldControl(): AbstractControl {
        return this.FormGroup.get(this.ControlAccess["id"]) as FormGroup;
    }

    get SanitizedURL(): SafeResourceUrl {
        if (this.ControlAccess["embedurl"].includes("youtube.com")) {
            return this.sanitize.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.ControlAccess["embedurl"].split("v=")[1]}`);
        } else if (this.ControlAccess["embedurl"].includes("instagram.com")) {
            return this.sanitize.bypassSecurityTrustResourceUrl(`https://www.instagram.com/p/${this.ControlAccess["embedurl"].split("/")[4]}/embed/`);
        } else if (this.ControlAccess["embedurl"].includes("dai.ly") || this.ControlAccess["embedurl"].includes("dailymotion.com")) {
            return this.sanitize.bypassSecurityTrustResourceUrl(`https://www.dailymotion.com/embed/video/${this.ControlAccess["embedurl"].split("/")[3]}`);
        } else if (this.ControlAccess["embedurl"].includes("vimeo.com")) {
            return this.sanitize.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${this.ControlAccess["embedurl"].split("/")[3]}`);
        }
        return null;
    }
}
