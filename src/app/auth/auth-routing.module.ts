import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    {
        path: "login",
        component: AuthComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
