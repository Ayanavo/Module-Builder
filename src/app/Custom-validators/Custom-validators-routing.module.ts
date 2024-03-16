import { Routes, RouterModule } from "@angular/router";
import { PasswordComponent } from "./components/password/password.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: "", component: PasswordComponent }];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
//export const CustomValidatorsRoutes = RouterModule.forChild(routes);
export class CustomValidatorsRoutes {}
