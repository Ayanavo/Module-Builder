import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListingComponent } from "./Components/listing/listing.component";
import { FieldComponent } from "./Components/field/field.component";

const routes: Routes = [
    {
        path: "",
        component: ListingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TableListingRoutingModule {}
