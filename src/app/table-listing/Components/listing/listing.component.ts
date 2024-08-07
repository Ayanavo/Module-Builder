import {Clipboard} from "@angular/cdk/clipboard";
import {Component, inject, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FirebaseError} from "firebase/app";
import {forkJoin} from "rxjs";
import {CommonService} from "src/app/Services/common.service";
import {StorageService} from "src/app/Services/storage.service";
import {ToastService} from "src/app/toast-service/toast-container.service";

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
    service = inject(CommonService);
    store = inject(StorageService);
    modalService = inject(NgbModal);
    notifyservice = inject(ToastService);
    router = inject(Router);
    clipboard = inject(Clipboard);
    injectionIdArray: Array<string>;
    SystemFields = ["label", "html", "audio"];
    ngOnInit(): void {
        this.initializeTable();
    }
    initializeTable() {
        forkJoin([this.service.getDataSource(), this.service.getFormSchema()]).subscribe({
            next: (res: Array<unknown>) => {
                res[0] && (this.injectionIdArray = Object.keys(res[0]));
                res[0] && (this.CommonListing = Object.values(res[0]));
                res[1] &&
                    res[1]["tabs"].forEach((_, i: number) =>
                        res[1]["tabs"][i].columns.forEach((fl) => fl.fields.forEach((el: {label: string; type: string}) => !this.SystemFields.includes(el.type) && (this.CommonSchema.push(el), this.CommonHeader.push(el.label))))
                    );
            },
            error: (err: FirebaseError) => {
                this.notifyservice.showToasterMsg({message: err.code + err.message, type: "fail"});
                console.error(err.message);
            },
        });
    }

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
                this.notifyservice.showToasterMsg({message: err.code + err.message, type: "fail"});
                console.error(err.message);
            },
        });
    }

    copy(item: string) {
        this.clipboard.copy(JSON.stringify({id: this.injectionIdArray[item], data: this.CommonListing[item]}));
        this.notifyservice.showToasterMsg({message: "Copied successfully", type: "success"});
    }
}
