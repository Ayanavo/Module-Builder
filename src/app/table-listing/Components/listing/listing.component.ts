import { Component, inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "src/app/Services/storage.service";
import { TableListingService } from "../../table-listing.service";
import { AuthService } from "src/app/auth/auth.service";
import { debounceTime, forkJoin, switchMap } from "rxjs";
import { UserCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { NavigationExtras, Router } from "@angular/router";
import { ToastService } from "src/app/toast-service/toast-container.service";
import { CommonService } from "src/app/Services/common.service";

@Component({
    selector: "app-listing",
    templateUrl: "./listing.component.html",
    styleUrls: ["./listing.component.scss"],
})
export class ListingComponent implements OnInit {
    CommonListing: Array<any>;
    CommonHeader: Array<any> = [];
    CommonSchema: Array<any> = [];
    @ViewChild("content") content!: TemplateRef<any>;
    item: any;
    service = inject(CommonService);
    store = inject(StorageService);
    modalService = inject(NgbModal);
    authService = inject(AuthService);
    notifyservice = inject(ToastService);
    router = inject(Router);
    injectionIdArray: Array<string>;
    ngOnInit(): void {
        // this.store.get("listing").then((res) => {
        //     this.CommonListing = res;
        //     console.log(this.CommonListing);
        // });
        this.initializeTable();
        // this.store.get("layout_schema").then((res) => {
        //     res &&
        //         res.tabs.forEach((col, i) =>
        //             res.tabs[i].columns.forEach((fl) =>
        //                 fl.fields.forEach((el) => {
        //                     this.CommonSchema.push(el), this.CommonHeader.push(el.label);
        //                 })
        //             )
        //         );
        // });
    }
    initializeTable() {
        forkJoin([this.service.getDataSource(), this.service.getFormSchema()]).subscribe({
            next: (res) => {
                this.injectionIdArray = Object.keys(res[0]);
                this.CommonListing = Object.values(res[0]);
                const response = Object.values(res[1])[0];
                response["tabs"].forEach((_: any, i: string | number) => response["tabs"][i].columns.forEach((fl) => fl.fields.forEach((el) => (this.CommonSchema.push(el), this.CommonHeader.push(el.label)))));
            },
            error: (err) => {
                this.notifyservice.showToasterMsg({ message: err.code + err.message, type: "fail" });
                console.error(err.message);
            },
        });
    }

    // openActionmenu(obj: any) {
    //     const modalRef = this.modalService.open(this.content, { centered: true, scrollable: true });
    //     modalRef.componentInstance.field = obj;
    //     modalRef.closed.subscribe((res) => console.log(res));
    // }

    edit(item: string) {
        this.router.navigate(["/forms/update", this.injectionIdArray[item]], {
            state: this.CommonListing[item],
        } as NavigationExtras);
    }

    logout() {
        this.authService
            .AuthLogout()
            .pipe(
                debounceTime(300),
                switchMap(async (x) => x)
            )
            .subscribe({
                next: () => {
                    localStorage.clear();
                    this.notifyservice.showToasterMsg({ message: "Logged out successfully", type: "success" });
                    this.router.navigateByUrl("/");
                },
                error: (err: FirebaseError) => {
                    this.notifyservice.showToasterMsg({ message: err.code + err.message, type: "fail" });
                    console.error(err.message);
                },
            });
    }
}
