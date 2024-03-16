import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, debounceTime, distinctUntilChanged, map } from "rxjs";
import { TestApiService } from "../test-api.service";

@Component({
    selector: "app-test-api",
    templateUrl: "./test-api.component.html",
    styleUrls: ["./test-api.component.scss"],
})
export class TestApiComponent implements OnInit {
    showColumns: string[] = ["username", "email", "name", "phone"];
    userListing$: Observable<any[]>;
    search: FormControl = new FormControl("");
    constructor(private service: TestApiService) {}
    ngOnInit(): void {
        this.userListing$ = this.service.getUserList().pipe(map((data) => data.filter((dataobj) => this.filterSearch(dataobj))));
    }
    filterSearch(recordObj: any[]): Observable<boolean> {
        this.search.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                map((val) => {
                    console.log(val, recordObj, recordObj["username"].includes(val));
                    return recordObj["username"].includes(val);
                    //    return dataObj.hasOwnProperty(val.toString());
                })
            )
            .subscribe();

        return this.search.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map((val) => recordObj["username"].includes(val))
        );

        // return of(filterSearch).pipe(
        //     debounceTime(300),
        //     this.search.valueChanges.pipe(tap((x) => console.log(x)))

        // );
    }
}

// merge(this.search.valueChanges.pipe(debounceTime(300), this.filterSearch))
