import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxBootstrapIconsModule, allIcons } from "ngx-bootstrap-icons";
import { SharedFieldsModule } from "../shared-fields/shared-fields.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "./auth.service";
import { AuthComponent } from "./components/auth/auth.component";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
    declarations: [AuthComponent, RegisterComponent],
    imports: [ReactiveFormsModule, NgxBootstrapIconsModule.pick(allIcons), CommonModule, AuthRoutingModule, SharedFieldsModule],
    providers: [AuthService],
})
export class AuthModule {}
