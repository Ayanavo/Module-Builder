import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class TableListingService {
    route = inject(Router);

    getDataSource() {
        return [
            { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890" },
            { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210" },
            { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "555-555-5555" },
        ];
    }
}
