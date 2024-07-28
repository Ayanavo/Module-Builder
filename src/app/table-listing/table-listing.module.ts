import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { allIcons, NgxBootstrapIconsModule } from "ngx-bootstrap-icons";
import { SharedFieldsModule } from "../shared-fields/shared-fields.module";
import { FieldComponent } from "./Components/field/field.component";
import { ListingComponent } from "./Components/listing/listing.component";
import { TableListingRoutingModule } from "./table-listing-routing.module";
import { TableListingService } from "./table-listing.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [ListingComponent, FieldComponent],
    imports: [CommonModule, NgxBootstrapIconsModule.pick(allIcons), NgbToast, NgbModule, SharedFieldsModule, ReactiveFormsModule, TableListingRoutingModule],
    providers: [TableListingService],
})
export class TableListingModule {}
