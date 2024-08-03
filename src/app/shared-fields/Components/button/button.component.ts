import {Component, Input} from "@angular/core";

@Component({
    selector: "app-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
    @Input() ControlAccess: Object;
    constructor() {}

    buttonAlignmentConfig = {
        start: "justify-content-start",
        center: "justify-content-center",
        end: "justify-content-end",
    };

    buttonColWidthConfig = {
        quarter: "w-10",
        third: "w-25",
        half: "w-50",
        full: "w-100",
    };

    getclickEvent() {
        console.log("Clicked");
    }
}
