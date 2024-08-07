import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./components/auth/auth.component";
import {RegisterComponent} from "./components/register/register.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";

const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {
        path: "login",
        component: AuthComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    },
    {
        path: "forgotpassword",
        component: ForgotPasswordComponent,
    },
    {
        path: "**",
        redirectTo: "login",
        pathMatch: "full",
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
