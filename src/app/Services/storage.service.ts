import { Injectable } from "@angular/core";
import * as localforage from "localforage";

@Injectable({
    providedIn: "root",
})
export class StorageService {
    constructor() {
        localforage.config({
            driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
            name: "App Storage",
            version: 1.0,
        });
    }

    set(key: string, value: any): void {
        localforage.setItem(key, value);
    }

    get(key: string): Promise<any> {
        // let value: any;
        // localforage.getItem(key).then((res) => (value = res));
        // return value;
        return localforage.getItem(key);
    }

    remove(key: string): void {
        localforage.removeItem(key);
    }

    reset(): void {
        localStorage.clear();
    }

    listKeys() {
        return localforage.keys();
    }
}
