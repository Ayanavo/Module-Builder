import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: "[numberonly]",
})
export class NumberonlyDirective {
    constructor() {}

    @HostListener("keypress", ["$event"])
    onKeyPress(event) {
        return /^[0-9]+$/.test(event.key);
    }

    @HostListener("paste", ["$event"])
    onPaste(event: ClipboardEvent) {
        const pasteData = event.clipboardData.getData("text/plain");
        /[^0-9]/g.test(pasteData) && event.preventDefault();
    }
}
