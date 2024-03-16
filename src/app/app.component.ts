import { Component, TemplateRef, inject } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { NgbOffcanvas, OffcanvasDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { PromtUserService } from "./promt-user.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    providers: [PromtUserService],
})
export class AppComponent {
    constructor(private swUpdate: SwUpdate, private offcanvasService: NgbOffcanvas) {
        swUpdate.versionUpdates.subscribe((evt) => {
            switch (evt.type) {
                case "VERSION_DETECTED":
                    console.log(`Downloading new app version: ${evt.version.hash}`);
                    break;
                case "VERSION_READY":
                    console.log(`Current app version: ${evt.currentVersion.hash}`);
                    console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
                    break;
                case "VERSION_INSTALLATION_FAILED":
                    console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
                    break;
            }
        });
    }

    open(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { backdrop: false });
    }

    close() {
        this.offcanvasService.dismiss();
    }
}
