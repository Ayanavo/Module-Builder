import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";

@Component({
    selector: "display",
    templateUrl: "./display.component.html",
    styleUrls: ["./display.component.scss"],
})
export class DisplayComponent implements OnInit {
    counterDislay: number;
    constructor(private store: Store<{counter: {counter: number}}>) {}

    ngOnInit(): void {
        this.store.select("counter").subscribe((x) => {
            this.counterDislay = x.counter;
        });
    }
}
