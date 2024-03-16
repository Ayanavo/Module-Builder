import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MapComponent } from "./map/map.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "auth",
        pathMatch: "full",
    },
    {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then((A) => A.AuthModule),
    },
    {
        path: "custom-validator",
        loadChildren: () => import("./Custom-validators/Custom-validators.module").then((A) => A.CustomValidatorsModule),
    },
    {
        path: "forms",
        loadChildren: () => import("./Layout/layout.module").then((A) => A.LayoutModule),
    },
    {
        path: "build-forms",
        loadChildren: () => import("./build-form/build-form.module").then((A) => A.BuildFormModule),
    },
    {
        path: "api",
        loadChildren: () => import("./table/table.module").then((A) => A.TableModule),
    },
    {
        path: "store",
        component: MapComponent,
    },
    {
        path: "**",
        redirectTo: "",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
