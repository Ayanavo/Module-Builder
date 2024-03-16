import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./components/auth/auth.component";

@NgModule({
    declarations: [AuthComponent],
    imports: [ReactiveFormsModule, CommonModule, AuthRoutingModule],
})
export class AuthModule {}
