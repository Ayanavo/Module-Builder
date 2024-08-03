import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Auth, getAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CommonService {
    firebaseUrl: string = "https://my-project-82219-c98e3-default-rtdb.asia-southeast1.firebasedatabase.app/";
    http = inject(HttpClient);
    auth = inject(Auth);

    setFormSchema(config) {
        return this.http.post("users/" + this.auth.currentUser.uid, this.firebaseUrl + "/schema.json", config);
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

    deleteDataSource(id: string): Observable<unknown> {
        return this.http.delete(this.firebaseUrl + "/listing/" + id + ".json");
    }
    updateDataSource(id: string, dataObj): Observable<unknown> {
        return this.http.patch(this.firebaseUrl + "/listing/" + id + ".json", dataObj);
    }
}
