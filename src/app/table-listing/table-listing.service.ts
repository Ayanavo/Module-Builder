import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class TableListingService {
    route = inject(Router);

    logout() {
        localStorage.clear();
        this.route.navigateByUrl("/");
    }
}
