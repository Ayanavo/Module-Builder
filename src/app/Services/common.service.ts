import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CommonService {
    firebaseUrl: string = "https://my-project-82219-c98e3-default-rtdb.asia-southeast1.firebasedatabase.app/";
    http = inject(HttpClient);

    setFormSchema(config) {
        return this.http.post(this.firebaseUrl + "/schema.json", config);
    }

    getFormSchema() {
        return this.http.get(this.firebaseUrl + "/schema.json");
    }

    updateFormSchema(config) {
        return this.http.patch(this.firebaseUrl + "/schema.json", config);
    }

    saveDataSource(dataObj) {
        return this.http.post(this.firebaseUrl + "/listing.json", dataObj);
    }

    getDataSource(): Observable<unknown> {
        return this.http.get(this.firebaseUrl + "/listing.json");
    }
}
