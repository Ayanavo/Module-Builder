import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-svg-icon",
    templateUrl: "./svg-icon.component.html",
    styleUrl: "./svg-icon.component.scss",
})
export class SvgIconComponent {
    @Input() public name?: string;
    @Input() public fill: string = "black-fill";
    public svgIcon: any;

    constructor(
        private httpClient: HttpClient,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (!this.name) {
            this.svgIcon = "";
            return;
        }
        this.httpClient.get(`assets/svg/${this.name}.svg`, { responseType: "text" }).subscribe((value) => {
            this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
        });
    }
}
