import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./auth.guard";

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
        canActivate: [authGuard],
    },
    {
        path: "table-listing",
        loadChildren: () => import("./table-listing/table-listing.module").then((A) => A.TableListingModule),
        canActivate: [authGuard],
    },
    {
        path: "forms",
        loadChildren: () => import("./Layout/layout.module").then((A) => A.LayoutModule),
        canActivate: [authGuard],
    },
    {
        path: "build-forms",
        loadChildren: () => import("./build-form/build-form.module").then((A) => A.BuildFormModule),
        canActivate: [authGuard],
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
