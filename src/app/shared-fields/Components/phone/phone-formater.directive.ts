import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
    selector: "[PhoneFormater]",
})
export class PhoneFormaterDirective {
    constructor(private el: ElementRef) {}
    @Input() PhoneFormater: string = "__________";
    @HostListener("input", ["$event"]) onInputChange(event: Event) {
        const initialValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initialValue.replace(/[^0-9]/g, "").substring(0, 10);

        if (initialValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
