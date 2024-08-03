import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges, TemplateRef} from "@angular/core";
import {SwUpdate} from "@angular/service-worker";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {PromtUserService} from "./Services/promt-user.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    providers: [PromtUserService],
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
    constructor(
        private swUpdate: SwUpdate,
        private offcanvasService: NgbOffcanvas
    ) {
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

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        // console.log("changes");
    }
    ngDoCheck(): void {
        // console.log("check");
    }
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        // const a = new Array([2]);
        // Array.shift(3);
        //   let a = [2, 3];
        // a.shift();
        // console.log(a);
        // console.log([23, 69].map(Validators.required));
        // console.log(Math.permute("aab"));
    }

    ngAfterContentInit(): void {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
        // console.log("content");
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        // console.log("view");
    }

    ngAfterContentChecked(): void {
        //Called after every check of the component's or directive's content.
        //Add 'implements AfterContentChecked' to the class.
        // console.log("check content");
    }

    ngAfterViewChecked(): void {
        //Called after every check of the component's view. Applies to components only.
        //Add 'implements AfterViewChecked' to the class.
        // console.log("checked view");
    }

    open(content: TemplateRef<any>) {
        this.offcanvasService.open(content, {backdrop: false});
    }

    close() {
        this.offcanvasService.dismiss();
    }
}

class Math {
    static permute(word: string): number {
        let term = {};
        word.split("").forEach((item) => (term.hasOwnProperty(item) ? term[item]++ : (term[item] = 1)));
        return this.factorial(word.length) / Object.values(term).reduce<number>((array: number, item: number) => array * this.factorial(item), 1);
    }
    private static factorial(length: number): number {
        let fact = 1;
        []
            .constructor(length)
            .fill(0)
            .forEach((_, i) => (fact *= length - i));
        return fact;
    }
    static required(para: any) {
        return para + 1 > 50;
    }
}
