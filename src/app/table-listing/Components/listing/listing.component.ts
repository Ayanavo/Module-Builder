import { Component, inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FirebaseError } from "firebase/app";
import { debounceTime, forkJoin, switchMap } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { CommonService } from "src/app/Services/common.service";
import { StorageService } from "src/app/Services/storage.service";
import { ToastService } from "src/app/toast-service/toast-container.service";
import { Clipboard } from "@angular/cdk/clipboard";

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
    clipboard = inject(Clipboard);
    injectionIdArray: Array<string>;
    ngOnInit(): void {
        this.initializeTable();
    }
    initializeTable() {
        forkJoin([this.service.getDataSource(), this.service.getFormSchema()]).subscribe({
            next: (res) => {
                if (res[0]) {
                    this.injectionIdArray = Object.keys(res[0]);
                    this.CommonListing = Object.values(res[0]);
                }
                const response = Object.values(res[1])[0];
                response["tabs"].forEach((_: any, i: string | number) => response["tabs"][i].columns.forEach((fl) => fl.fields.forEach((el) => (this.CommonSchema.push(el), this.CommonHeader.push(el.label)))));
            },
            error: (err: FirebaseError) => {
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

    delete(item: string) {
        this.service.deleteDataSource(this.injectionIdArray[item]).subscribe({
            next: (res) => {
                this.CommonListing = this.CommonListing.filter((_, index) => index !== +item);
            },
            error: (err: FirebaseError) => {
                this.notifyservice.showToasterMsg({ message: err.code + err.message, type: "fail" });
                console.error(err.message);
            },
        });
    }

    copy(item: string) {
        this.clipboard.copy(JSON.stringify({ id: this.injectionIdArray[item], data: this.CommonListing[item] }));
        this.notifyservice.showToasterMsg({ message: "Copied successfully", type: "success" });
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
