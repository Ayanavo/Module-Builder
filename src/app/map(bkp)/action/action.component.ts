import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {increment} from "src/app/store/counter.action";

@Component({
    selector: "action",
    templateUrl: "./action.component.html",
    styleUrls: ["./action.component.scss"],
})
export class ActionComponent {
    constructor(private store: Store<{counter: {counter: number}}>) {}
    increment() {
        this.store.dispatch(increment());
    }
}
