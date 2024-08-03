import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedFieldsModule} from "../shared-fields/shared-fields.module";
import {FormsModule} from "@angular/forms";
import {LayoutComponent} from "./Layout/layout.component";
import {FieldDependencyService} from "./field-dependency.service";
import {LayoutRoutingModule} from "./layout-routing.module";
import {SortPipePipe} from "./sortPipe.pipe";
import {NgxBootstrapIconsModule, allIcons} from "ngx-bootstrap-icons";

@NgModule({
    declarations: [LayoutComponent, SortPipePipe],
    imports: [CommonModule, NgxBootstrapIconsModule.pick(allIcons), FormsModule, ReactiveFormsModule, SharedFieldsModule, LayoutRoutingModule],
    exports: [],

    providers: [FieldDependencyService],
})
export class LayoutModule {}
