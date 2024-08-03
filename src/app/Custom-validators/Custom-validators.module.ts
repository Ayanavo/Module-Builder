import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PasswordComponent} from "./components/password/password.component";
import {CustomValidatorsRoutes} from "./Custom-validators-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, CustomValidatorsRoutes, ReactiveFormsModule],
    declarations: [PasswordComponent],
})
export class CustomValidatorsModule {}
