import {ClipboardModule} from "@angular/cdk/clipboard";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {allIcons, NgxBootstrapIconsModule} from "ngx-bootstrap-icons";
import {SharedFieldsModule} from "../shared-fields/shared-fields.module";
import {FieldComponent} from "./Components/field/field.component";
import {ListingComponent} from "./Components/listing/listing.component";
import {TableListingRoutingModule} from "./table-listing-routing.module";
import {TableListingService} from "./table-listing.service";

@NgModule({
    declarations: [ListingComponent, FieldComponent],
    imports: [CommonModule, ClipboardModule, NgxBootstrapIconsModule.pick(allIcons), NgbToast, NgbModule, SharedFieldsModule, ReactiveFormsModule, TableListingRoutingModule],
    providers: [TableListingService],
})
export class TableListingModule {}
