import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
    selector: "[fileUpload]",
})
export class FileDirective {
    @Output() fileUpload = new EventEmitter<FileList>();

    @HostListener("drop", ["$event"]) onDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const files = evt.dataTransfer.files;
        files.length && this.fileUpload.emit(files);
    }
}
