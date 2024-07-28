import { Component, inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "src/app/Services/storage.service";
import { TableListingService } from "../../table-listing.service";

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
    service = inject(TableListingService);
    store = inject(StorageService);
    modalService = inject(NgbModal);

    ngOnInit(): void {
        this.store.get("listing").then((res) => {
            this.CommonListing = res;
            console.log(this.CommonListing);
        });
        this.store.get("layout_schema").then((res) => {
            res &&
                res.tabs.forEach((col, i) =>
                    res.tabs[i].columns.forEach((fl) =>
                        fl.fields.forEach((el) => {
                            this.CommonSchema.push(el), this.CommonHeader.push(el.label);
                        })
                    )
                );
        });
    }

    // openActionmenu(obj: any) {
    //     const modalRef = this.modalService.open(this.content, { centered: true, scrollable: true });
    //     modalRef.componentInstance.field = obj;
    //     modalRef.closed.subscribe((res) => console.log(res));
    // }

    logout() {
        this.service.logout();
    }
}
