import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./Layout/layout.component";

const routes: Routes = [
    { path: "create", component: LayoutComponent },
    {
        path: "update/:id",
        component: LayoutComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
