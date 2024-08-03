import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Database } from "@angular/fire/database";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CommonService {
    firebaseUrl: string;
    http = inject(HttpClient);
    auth = inject(Auth);
    database = inject(Database);
    constructor() {
        this.firebaseUrl = `https://my-project-82219-c98e3-default-rtdb.asia-southeast1.firebasedatabase.app/${localStorage.getItem("uid")}`;
    }

    setFormSchema(config: unknown): Observable<unknown> {
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

    deleteDataSource(id: string): Observable<unknown> {
        return this.http.delete(this.firebaseUrl + "/listing/" + id + ".json");
    }
    updateDataSource(id: string, dataObj): Observable<unknown> {
        return this.http.patch(this.firebaseUrl + "/listing/" + id + ".json", dataObj);
    }
}
